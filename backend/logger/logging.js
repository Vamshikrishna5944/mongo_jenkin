const winston = require("winston");
const { combine, timestamp, printf } = require("winston").format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] [${level}] [${message}]`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(winston.format.colorize(), timestamp({ format: "HH:mm:ss" }), myFormat),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/server.log" }),
  ],
});

module.exports = logger;