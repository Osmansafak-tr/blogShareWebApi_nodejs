const { Comment } = require("../../models");

exports.GetComments = async (req, res) => {
  try {
    const comments = await Comment.find().select("-__v");
    return res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.GetCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findOne({ _id: id }).select("-__v");
    if (comment == null) return res.status(404).json("User can not found.");

    return res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};
