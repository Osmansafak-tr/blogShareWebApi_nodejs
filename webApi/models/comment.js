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
    likeCount: Number,
    dislikeCount: Number,
  },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Comment", commentSchema);
