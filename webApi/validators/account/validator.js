const { check } = require("express-validator");

exports.RegisterValidator = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password should be 5-18 length").isLength({
    min: 5,
    max: 18,
  }),
  check("name", "Name field can be max 30 character length").isLength({
    max: 30,
  }),
  check("surname", "Surname field can be max 20 character length").isLength({
    max: 20,
  }),
];
