const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = Schema({
  name: {
    required: true,
    type: String,
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

module.exports = mongoose.model("Role", roleSchema);
