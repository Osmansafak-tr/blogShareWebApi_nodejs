const { check, param } = require("express-validator");

exports.GetRoleByIdValidator = [
  param("id", "Id parameter's length should be 24.").isLength(24),
];

exports.CreateRoleValidator = [
  check("name", "This name should have at least 3 characters").trim().isLength({
    min: 3,
  }),
];

exports.UpdateRoleValidator = [
  param("id", "Id parameter's length should be 24.").isLength(24),
  check("name", "This name should have at least 3 characters").trim().isLength({
    min: 3,
  }),
];

exports.DeleteRoleValidator = [
  param("id", "Id parameter's length should be 24.").isLength(24),
];
