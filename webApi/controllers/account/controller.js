const { User } = require("../../models");
const { AppError } = require("../../common/classes");
const { ErrorConstants } = require("../../common/constants");
const bcrypt = require("bcrypt");

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
