const { AppError } = require("../../../common/classes");
const { ErrorConstants } = require("../../../common/constants");
const { Comment } = require("../../../models");

exports.GetMyComments = async (req, res) => {
  const { user } = req;
  const comments = await Comment.find({ author: user._id }).select("-__v");

  return res.status(200).json(comments);
};

exports.GetCommentById = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const comment = await Comment.findOne({ _id: id }).select("-__v");
  if (comment == null)
    throw new AppError(ErrorConstants.DataNotFound, "Comment not found");
  if (comment.author.toString() != user._id.toString())
    throw new Error("User is not this comments author.");

  return res.status(200).json(comment);
};
