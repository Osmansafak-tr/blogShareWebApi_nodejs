const { Comment } = require("../../../models");

exports.GetMyComments = async (req, res) => {
  const { user } = req;
  const comments = await Comment.find({ author: user._id }).select("-__v");

  return res.status(200).json(comments);
};
