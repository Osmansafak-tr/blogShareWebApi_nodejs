const { Blog } = require("../../../models");

exports.GetMyBlogs = async (req, res) => {
  const user = req.user;
  if (user == null) throw new Error("User is not logged in.");

  const filter = { author: user._id };
  const blogs = await Blog.find(filter).select("-__v -comments");

  return res.status(200).json(blogs);
};
