const { Blog } = require("../../../models");
const { isAuthorValid, isKeywordsValid } = require("./functions");
const common = require("../../../common");
const { AppError } = common.classes;
const { ErrorConstants } = common.constants;

exports.GetBlogs = async (req, res) => {
  const blogs = await Blog.find().select("-__v -comments");
  return res.status(200).json(blogs);
};

exports.GetBlogById = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findOne({ _id: id }).select("-__v");
  if (blog == null)
    throw new AppError(ErrorConstants.DataNotFound, "Blog can not found.");

  return res.status(200).json(blog);
};

exports.CreateBlog = async (req, res) => {
  const { title, body, author, keywords } = req.body;
  const createModel = {
    title: title,
    body: body,
    author: author,
    keywords: keywords,
  };

  if (!(await isAuthorValid(author)))
    throw new AppError(ErrorConstants.DataNotFound, "Author is invalid");
  if (!(await isKeywordsValid(keywords)))
    throw new AppError(ErrorConstants.DataNotFound, "Keywords are invalid");

  const filters = { title: title, author: author };
  const blog = await Blog.findOne(filters).select("_id");
  if (blog != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "This author already have a blog with the same title."
    );

  await Blog.create(createModel);
  return res.status(200).json("Blog has been created successfully.");
};

exports.UpdateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body, author, keywords } = req.body;

  if (!(await isAuthorValid(author)))
    throw new AppError(ErrorConstants.DataNotFound, "Author is invalid");
  if (!(await isKeywordsValid(keywords)))
    throw new AppError(ErrorConstants.DataNotFound, "Keywords are invalid");

  const filter = { title: title, author: author, _id: { $ne: id } };
  const sameBlog = await Blog.findOne(filter).select("_id");
  if (sameBlog != null)
    throw new AppError(
      ErrorConstants.SameDataAlreadyCreated,
      "This author already have a blog with the same title."
    );

  const blog = await Blog.findOne({ _id: id });
  if (blog == null)
    throw new AppError(ErrorConstants.DataNotFound, "Blog can not found.");
  blog.title = title;
  blog.body = body;
  blog.author = author;
  blog.keywords = keywords;
  await blog.save();
  return res.status(200).json("Blog has been updated successfully");
};

exports.DeleteBlog = async (req, res) => {
  const { id } = req.params;
  const deleteDoc = await Blog.deleteOne({ _id: id });
  if (deleteDoc.deletedCount == 0)
    throw new AppError(ErrorConstants.DataNotFound, "Blog can not found.");

  return res.status(200).json({ message: "Role successfully deleted." });
};
