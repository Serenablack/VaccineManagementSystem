const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
usersRouter.get("/", async (request, response) => {
  const users = await User.find({});

  response.json(users.map((user) => user.toJSON()));
});

usersRouter.post("/", async (request, response) => {
  const { email, name, password } = request.body;
  if (!(email || password) || password.length < 7) {
    return response.status(400).json({
      error: `User validation failed: email: Path password is shorter than the minimum allowed length (7).`,
    });
  } else {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(400).json({
        error: "This e-mail is already in use.",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      email,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  }
});
module.exports = usersRouter;
