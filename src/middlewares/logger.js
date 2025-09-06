const morgan = require("morgan");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

module.exports = (app) => {
  app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));
  console.log("Logging enabled (Morgan + Winston)");
};
