const { User } = require("../../models");
const { AppError } = require("../../common/classes");
const { ErrorConstants } = require("../../common/constants");
const bcrypt = require("bcrypt");
const axios = require("axios");

exports.Register = async (req, res) => {
  const { email, password, name, surname } = req.body;
  if ((await User.findOne({ email: email })) != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "There is already a user with this email."
    );

  bcrypt.hash(password, 16).then((hashedPassword) => {
    const userModel = {
      email: email,
      password: hashedPassword,
      name: name == null || name == undefined ? "" : name,
      surname: surname == null || surname == undefined ? "" : surname,
    };
    User.create(userModel);
  });
  return res.status(200).json("User successfully registered");
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user == null)
    throw new AppError(ErrorConstants.DataNotFound, "User can not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid Password");

  // Make token request
  const body = {
    email: email,
    password: user.password,
  };
  const response = await axios.post(
    `${process.env.TOKEN_API_URL}/connect/token`,
    body
  );
  // Update user refresh token
  user.refreshToken = response.data.refreshToken;
  await user.save();
  // Create jwt cookie
  const token = response.data.accessToken;
  await res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  return res.status(200).json({ message: "User successfully login" });
};
