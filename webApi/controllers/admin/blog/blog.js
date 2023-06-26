const { Blog } = require("../../../models");
const { isAuthorValid, isKeywordsValid } = require("./functions");

exports.GetBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select("-__v -comments");
    return res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.GetBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOne({ _id: id }).select("-__v");
    if (blog == null) return res.status(404).json("Blog can not found.");

    return res.status(200).json(blog);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.CreateBlog = async (req, res) => {
  const { title, body, author, keywords } = req.body;
  const createModel = {
    title: title,
    body: body,
    author: author,
    keywords: keywords,
  };
  try {
    if (!(await isAuthorValid(author)))
      return res.status(500).json("Author is invalid");
    if (!(await isKeywordsValid(keywords)))
      return res.status(500).json("Keywords are invalid");

    const filters = { title: title, author: author };
    const blog = await Blog.findOne(filters).select("_id");
    if (blog != null)
      return res
        .status(500)
        .json("This author already have a blog with the same title.");

    await Blog.create(createModel);
    return res.status(200).json("Blog has been created successfully.");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.UpdateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body, author, keywords } = req.body;
  try {
    if (!(await isAuthorValid(author)))
      return res.status(500).json("Author is invalid");
    if (!(await isKeywordsValid(keywords)))
      return res.status(500).json("Keywords are invalid");

    const filter = { title: title, author: author };
    var blog = await Blog.findOne(filter).select("_id");
    if (blog != null)
      return res
        .status(500)
        .json("This author already have a blog with the same title.");

    blog = await Blog.findOne({ _id: id });
    blog.title = title;
    blog.body = body;
    blog.author = author;
    blog.keywords = keywords;
    await blog.save();
    return res.status(200).json("Blog has been updated successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

exports.DeleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteDoc = await Blog.deleteOne({ _id: id });
    if (deleteDoc.deletedCount == 0)
      return res.status(404).json("Blog can not found.");

    return res.status(200).json({ message: "Role successfully deleted." });
  } catch (error) {
    console.error = error;
    return res.status(500).json(error);
  }
};
