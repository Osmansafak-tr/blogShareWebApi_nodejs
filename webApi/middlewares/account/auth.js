const jwt = require("jsonwebtoken");
const { User } = require("../../models");

exports.checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt != undefined ? req.cookies.jwt : null;
  console.log(token);

  if (token == null) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      return next(err);
    }

    const user = User.findOne({ email: decodedToken.email });
    if (user == null) {
      req.user = null;
      return next();
    }

    res.locals.user = user;
    req.user = user;
    return next();
  });
};
