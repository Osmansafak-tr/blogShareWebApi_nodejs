const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  validationResult(req).throw();
  return next();
};
