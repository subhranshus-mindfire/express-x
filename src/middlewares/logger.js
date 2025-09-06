const morgan = require("morgan");
const winston = require("winston");

module.exports = (app) => {
  const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
  });

  app.use(morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } }));
  console.log("Logging enabled (Morgan + Winston)");
};
