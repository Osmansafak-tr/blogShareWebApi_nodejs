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
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
    saveCount: {
      type: Number,
      default: 0,
    },
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
