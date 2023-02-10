const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const config = require("./utils/config");
const vaccineRouter = require("./controllers/vaccineRouter");
const usersRouter = require("./controllers/usersRouter");
const loginRouter = require("./controllers/loginRouter");
const middleware = require("./utils/middleware");

mongoose
  .connect(config.DATABASE_URL)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use(express.static("dist"));
app.use(`${config.baseUrl}api/vaccines`, vaccineRouter);

app.use(`${config.baseUrl}api/users`, usersRouter);
app.use(`${config.baseUrl}api/login`, loginRouter);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
module.exports = app;
