const { check } = require("express-validator");

exports.CreateTokensValidator = [
  check("email", "Invalid email").isEmail(),
  // check("password", "Password length must be 5-18 length.").isHash(),
];

exports.RefreshTokenValidator = [
  check("refreshToken", "Invalid refresh token").isJWT(),
];

exports.DeleteToken = [check("refreshToken", "Invalid refresh token").isJWT()];
