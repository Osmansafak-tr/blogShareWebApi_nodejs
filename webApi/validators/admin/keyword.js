const { check, param } = require("express-validator");

exports.GetKeywordByIdValidator = [
    param("id", "Id parameter's length should be 24.").isLength(24),
]

exports.CreateKeywordValidator = [
  check("name", "This name should have at least 3 characters").trim().isLength({
    min: 3,
  }),
];

exports.UpdateKeywordValidator = [
  param("id", "Id parameter's length should be 24.").isLength(24),
  check("name", "This name should have at least 3 characters").trim().isLength({
    min: 3,
  }),
];

exports.DeleteKeywordValidator = [
    param("id", "Id parameter's length should be 24.").isLength(24),
]
