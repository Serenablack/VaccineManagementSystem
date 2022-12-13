require("dotenv").config();

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  port: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
};
