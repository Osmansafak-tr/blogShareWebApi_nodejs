const mongoose = require("mongoose");
const { Keyword, Role, User, Blog, Comment } = require("../models/index");
const bcrypt = require("bcrypt");

exports.connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected MongoDb database.");
  } catch (error) {
    console.error(error);
  }
};

async function isDatabaseEmpty() {
  if ((await Keyword.findOne()) != null) {
    return false;
  }

  if ((await Role.findOne()) != null) {
    return false;
  }

  if ((await User.findOne()) != null) {
    return false;
  }

  if ((await Blog.findOne()) != null) {
    return false;
  }

  if ((await Comment.findOne()) != null) {
    return false;
  }

  return true;
}

exports.generateData = async () => {
  if ((await isDatabaseEmpty()) == true) {
    await Keyword.insertMany([
      {
        name: "Science",
      },
      {
        name: "Programming",
      },
      {
        name: "Education",
      },
    ]);

    await Role.insertMany([
      {
        name: "User",
      },
      {
        name: "Admin",
      },
    ]);

    await bcrypt.hash("12345", 16).then((hashedPassword) => {
      User.insertMany([
        {
          email: "email1@gmail.com",
          password: hashedPassword,
        },
        {
          email: "email2@gmail.com",
          password: hashedPassword,
        },
      ]);
    });

    const user = await User.findOne({ email: "email1@gmail.com" }).select(
      "_id"
    );
    const keyword = await Keyword.findOne({ name: "Science" }).select("_id");
    await Blog.insertMany([
      {
        title: "Blog 1",
        body: "This is blog1's body.",
        author: user._id,
        keywords: [keyword._id],
      },
      {
        title: "Blog 2",
        body: "This is blog2's body.",
        author: user._id,
        keywords: [keyword._id],
      },
    ]);

    const blog = await Blog.findOne({ author: user._id }).select("_id");
    await Comment.insertMany([
      {
        author: user._id,
        blog: blog._id,
        body: "This is first users comment",
      },
      {
        author: user._id,
        blog: blog._id,
        body: "This is first users second comment",
      },
    ]);
  }
};
