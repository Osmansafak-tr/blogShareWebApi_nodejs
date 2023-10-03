const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = Schema({
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blog: {
    type: mongoose.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  body: {
    type: String,
    required: true,
  },

  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
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
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
