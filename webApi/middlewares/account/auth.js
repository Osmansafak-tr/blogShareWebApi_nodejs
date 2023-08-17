const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { RoleConstants } = require("../../common").constants;

// Authentication Middlewares
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

exports.isAuthenticated = async (req, res, next) => {
  const { user } = req;
  if (user == null) return next(new Error("User is not Authenticated."));
  else return next();
};

// Authorization Middlewares
exports.isAdmin = async (req, res, next) => {
  const user = req.user;
  // if (user == null) return next(new Error("User is not Authenticated."));

  for (const role in user.roles) {
    if (user.roles[role] == RoleConstants.ADMIN) return next();
  }

  return next(new Error("User have not Admin role."));
};
