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
  if(req.user != null)
    throw new Error("User already login.");

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

exports.Logout = async (req, res) => {
  const refreshToken = req.user != null ? req.user.refreshToken : null;
  if (refreshToken == null)
    throw new AppError(
      ErrorConstants.DataNotFound,
      "Refresh token can not found"
    );
  await axios.delete(`${process.env.TOKEN_API_URL}`, {
    data: {
      refreshToken: refreshToken,
    },
  });
  await res.clearCookie("jwt");
  return res.status(200).json("User logout successful.");
};

exports.Refresh = async (req,res) => {
  const refreshToken = req.user != null ? req.user.refreshToken : null;
  if (refreshToken == null)
    throw new AppError(
      ErrorConstants.DataNotFound,
      "Refresh token can not found"
    );
  // Check User
  const user = await User.findOne({_id: req.user._id});
  if(user == null)
    throw new AppError(ErrorConstants.DataNotFound, "User can not found");
  // Refresh users refreshToken
  const tokens = await axios.post(`${process.env.TOKEN_API_URL}/refreshToken`, {refreshToken: refreshToken});
  const newRefreshToken = tokens.data.refreshToken;
  user.refreshToken = newRefreshToken;
  await user.save();
  // Create new cookie
  const newAccessToken = tokens.data.accessToken;
  await res.clearCookie("jwt");
  await res.cookie("jwt", newAccessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });

  return res.status(200).json({ message: "Cookie successfully refreshed." });
};
