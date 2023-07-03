const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const valResult = validationResult(req).array();
  if (valResult.length != 0) return res.status(403).json(valResult);

  return next();
};
