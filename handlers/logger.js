const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(), // Logs to console
    new winston.transports.File({ filename: "combined.log" }), // Logs to file
  ],
});
module.exports = logger;
