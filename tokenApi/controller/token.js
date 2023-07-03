const { generateAccessToken, generateRefreshToken } = require("./functions");

exports.CreateTokens = async (req, res) => {
  const { email, password } = req.body;
  const user = {
    email: email,
    password: password,
  };
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const result = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
  return res.status(200).json(result);
};
