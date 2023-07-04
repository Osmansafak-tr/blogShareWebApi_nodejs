const { generateAccessToken, generateRefreshToken } = require("./functions");
const { RefreshToken } = require("../models/index");
const jwt = require("jsonwebtoken");

exports.CreateTokens = async (req, res) => {
  const { email, password } = req.body;
  const user = {
    email: email,
    password: password,
  };
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await RefreshToken.create({ jwt: refreshToken });

  const result = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  return res.status(200).json(result);
};

exports.RefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if ((await RefreshToken.findOne({ jwt: refreshToken })) == null)
    return res.status(404).json("RefreshToken can not found");

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(500).json(err);
    const accessToken = generateAccessToken({
      email: user.email,
      password: user.password,
    });
    return res.json({ accessToken: accessToken });
  });
};
