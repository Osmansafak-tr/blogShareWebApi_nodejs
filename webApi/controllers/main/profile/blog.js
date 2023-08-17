const { Blog } = require("../../../models");

exports.GetMyBlogs = async (req, res) => {
  const { user } = req;

  const filter = { author: user._id };
  const blogs = await Blog.find(filter).select("-__v -comments");

  return res.status(200).json(blogs);
};
