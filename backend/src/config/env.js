require("dotenv").config();

module.exports = {
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV || "development",
  logLevel: process.env.LOG_LEVEL || "info",
};