const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const loginRouter = require("express").Router();
const config = require("../utils/config");
require("dotenv").config();
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
    expiresIn: 60 * 60,
  });
  const refreshToken = jwt.sign(userForToken, config.REFRESH_SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  response.status(200).send({
    token,
    refreshToken,
    email: user.email,
    fullName: user.name,
    id: user.id,
  });
});

loginRouter.post('/refresh"', (req, res) => {
  const { email, name, refreshToken } = req.body;
  if (refreshToken) {
    const user = {
      email: email,
      fullName: name,
    };
    const token = jwt.sign(user, config.secret, {
      expiresIn: config.tokenLife,
    });
    const response = {
      token,
    };
    // update the token in the list
    tokenList[refreshToken] = token;
    res.status(200).json(response);
  } else {
    res.status(404).send("Invalid request");
  }
});

module.exports = loginRouter;
