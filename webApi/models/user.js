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

  name: String,
  surname: String,
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
  accessToken: String,
  refreshToken: String,
  refreshTokenExpireDate: Date,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("User", userSchema);
