const { Comment } = require("../../models");
const common = require("../../common");
const { AppError } = common.classes;
const { ErrorConstants } = common.constants;

exports.GetComments = async (req, res) => {
  const comments = await Comment.find().select("-__v");
  return res.status(200).json(comments);
};

exports.GetCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findOne({ _id: id }).select("-__v");
  if (comment == null)
    throw new AppError(ErrorConstants.DataNotFound, "User can not found.");

  return res.status(200).json(comment);
};
