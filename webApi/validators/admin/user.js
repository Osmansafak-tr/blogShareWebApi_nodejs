const { param } = require("express-validator");

exports.GetUserByIdValidator = [
  param("id", "Id parameter's length should be 24.").isLength(24),
];
