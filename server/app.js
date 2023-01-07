const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

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
app.use("/api/vaccines", vaccineRouter);

app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});
module.exports = app;
