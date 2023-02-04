const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const loginRouter = require("express").Router();
const config = require("../utils/config");
require("dotenv").config();
const tokenList = {};

loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  const user = await User.findOne({ email });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid email or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(userForToken, config.SECRET, {
    expiresIn: 20,
  });

  const refreshToken = jwt.sign(userForToken, config.REFRESH_SECRET, {
    expiresIn: 60,
  });

  tokenList[refreshToken] = token;
  response.status(200).send({
    token,
    refreshToken,
    email: user.email,
    fullName: user.name,
    id: user.id,
  });
});

loginRouter.post('/refresh"', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({
      error: "invalid refresh token",
    });
  }

  try {
    jwt.verify(refreshToken, config.REFRESH_SECRET);
  } catch (error) {
    return res.status(401).json({
      error: "invalid refresh token",
    });
  }

  const accessToken = tokenList[refreshToken];
  if (!accessToken) {
    return res.status(401).json({
      error: "invalid refresh token",
    });
  }

  delete tokenList[refreshToken];

  const userForToken = jwt.decode(accessToken);
  const newAccessToken = jwt.sign(userForToken, config.SECRET, {
    expiresIn: 20,
  });
  const newRefreshToken = jwt.sign(userForToken, config.REFRESH_SECRET, {
    expiresIn: 60,
  });

  tokenList[newRefreshToken] = newAccessToken;

  res.status(200).send({
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  });
});
module.exports = loginRouter;
