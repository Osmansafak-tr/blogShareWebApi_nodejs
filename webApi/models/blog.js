const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  keywords: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Keyword",
      required: true,
    },
  ],

  interaction: {
    like: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        createdAt: Date,
      },
    ],
    dislike: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        createdAt: Date,
      },
    ],
    save: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        createdAt: Date,
      },
    ],
    likeCount: Number,
    dislikeCount: Number,
    saveCount: Number,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Blog", blogSchema);
