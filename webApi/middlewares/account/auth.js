const jwt = require("jsonwebtoken");
const { User } = require("../../models");

exports.checkAuth = async (req, res, next) => {
  const token = req.cookies.jwt != undefined ? req.cookies.jwt : null;

  if (token == null) {
    req.user = null;
    return next();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      return next(err);
    }

    const filter = {
      email: decodedToken.email,
      password: decodedToken.password,
    };
    User.findOne(filter).then((user) => {
      if (user == null) {
        req.user = null;
        return next();
      }

      req.user = user;
      return next();
    });

  });
};
