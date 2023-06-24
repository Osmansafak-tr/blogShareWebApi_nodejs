const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    default: "",
  },
  surname: {
    type: String,
    default: "",
  },
  dateOfBirth: Date,
  roles: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Role",
    },
  ],
  myBlogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  ],
  savedBlogs: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Blog",
    },
  ],
  accessToken: {
    type: String,
    default: "",
  },
  refreshToken: {
    type: String,
    default: "",
  },
  refreshTokenExpireDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
