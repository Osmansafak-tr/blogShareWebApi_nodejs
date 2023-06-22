const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = Schema({
  name: {
    required: true,
    type: String,
  },

  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Role",roleSchema);