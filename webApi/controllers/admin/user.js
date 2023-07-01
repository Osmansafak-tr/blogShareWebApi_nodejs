const { User } = require("../../models");
const common = require("../../common");
const { AppError } = common.classes;
const { ErrorConstants } = common.constants;

exports.GetUsers = async (req, res) => {
  const users = await User.find().select("-__v");
  return res.status(200).json(users);
};

exports.GetUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id }).select("-_id -__v");
  if (user == null)
    throw new AppError(ErrorConstants.DataNotFound, "User can not found.");

  return res.status(200).json(user);
};
