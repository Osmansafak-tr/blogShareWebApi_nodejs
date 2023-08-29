const { Blog } = require("../../../models");
const { AppError } = require("../../../common").classes;
const { ErrorConstants } = require("../../../common").constants;

exports.GetMyBlogs = async (req, res) => {
  const { user } = req;

  const filter = { author: user._id };
  const blogs = await Blog.find(filter).select("-__v -comments");

  return res.status(200).json(blogs);
};

exports.GetBlogById = async (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const blog = await Blog.findOne({ _id: id }).select("-__v");
  if (blog == null)
    throw new AppError(ErrorConstants.DataNotFound, "Blog can not found.");

  return res.status(200).json(blog);
};

exports.CreateBlog = async (req, res) => {
  const { user } = req;
  const { title, body, keywords } = req.body;
  const createModel = {
    title: title,
    body: body,
    author: user._id,
    keywords: keywords,
  };

  const filters = { title: createModel.title, author: createModel.author };
  const blog = await Blog.findOne(filters).select("_id");
  if (blog != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "You have a blog with the same title."
    );

  await Blog.create(createModel);
  return res.status(200).json("Blog has been created successfully.");
};

exports.UpdateBlog = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { title, body, keywords } = req.body;

  const blog = await Blog.findOne({ _id: id }).select("-__v");
  if (blog == null)
    throw new AppError(ErrorConstants.DataNotFound, "Blog can not found.");

  const sameBlog = await Blog.findOne({title: title, author: user._id});
  if(sameBlog != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "You have a blog with the same title."
    );
  blog.title = title;
  blog.body = body;
  blog.keywords = keywords;

  blog.save();
  return res.status(200).json("Blog successfully updated.");
};
