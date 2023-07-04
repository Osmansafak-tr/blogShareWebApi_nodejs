const { check } = require("express-validator");

exports.CreateTokensValidator = [
  check("email", "Invalid email").isEmail(),
  check("password", "Password length must be 5-18 length.").isLength({
    min: 5,
    max: 18,
  }),
];

exports.RefreshTokenValidator = [
  check("refreshToken", "Invalid refresh token").isJWT(),
];
