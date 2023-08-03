const { param, check } = require("express-validator");

exports.UpdateMyProfileValidator = [
  check("name", "Invalid name").isString().trim(),
  check("surname", "Invalid surname").isString().trim(),
  check("dateOfBirth", "Invalid date of Birth")
    .trim()
    .isDate()
    // .isDate({format: "DD/MM/YYYY"})
];
