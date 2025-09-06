const fs = require("fs");
const path = require("path");

const helmetMiddleware = require("./middlewares/helmet");
const corsMiddleware = require("./middlewares/cors");
const rateLimitMiddleware = require("./middlewares/rateLimit");
const sessionMiddleware = require("./middlewares/session");
const inputValidationMiddleware = require("./middlewares/inputValidation");
const jwtMiddleware = require("./middlewares/jwt");
const loggerMiddleware = require("./middlewares/logger");
const csrfMiddleware = require("./middlewares/csrf");
const defaultConfig = require("./defaultConfig");
const { createLogger } = require("winston");


module.exports = (app, userConfig = {}) => {
  const configPath = path.join(process.cwd(), "express-secure-x.json");

  if (fs.existsSync(configPath)) {
    try {
      const fileConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
      config = { ...defaultConfig, ...fileConfig, ...userConfig };
    } catch (err) {
      console.error("Error reading express-secure-x.json", err);
    }
  }

  if (config.helmet) helmetMiddleware(app, config.helmetConfig);
  if (config.cors) corsMiddleware(app, config.cors);
  if (config.rateLimit) rateLimitMiddleware(app, config.rateLimit);
  if (config.session) sessionMiddleware(app, config.session);
  if (config.inputValidation) inputValidationMiddleware(app);
  if (config.logger) loggerMiddleware(app);
  if (config.csrf) csrfMiddleware(app);

  app.jwt = jwtMiddleware;
};
