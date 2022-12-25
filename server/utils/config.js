require("dotenv").config();

module.exports = {
  DATABASE_URL:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL,
  port: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
};
