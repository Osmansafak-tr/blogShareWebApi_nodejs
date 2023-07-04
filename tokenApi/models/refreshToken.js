const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = Schema({
  jwt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
