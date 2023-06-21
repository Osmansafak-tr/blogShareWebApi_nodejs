const mongoose = require("mongoose");
const { Schema } = mongoose;

const keywordSchema = Schema({
  name: {
    required: true,
    type: String,
  },

  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Keyword",keywordSchema);
