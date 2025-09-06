const fs = require("fs");
const path = require("path");

module.exports = function secureExpress(app) {
  const configPath = path.join(process.cwd(), "express-x.json");

  if (!fs.existsSync(configPath)) {
    console.warn("No express-x.json found. Run `npx express-x` first.");
    return;
  }

  const config = require(configPath);

  if (config.helmet) require("./middlewares/helmet")(app);
  if (config.rateLimit) require("./middlewares/rateLimit")(app);
  if (config.csrf) require("./middlewares/csrf")(app);
  if (config.cors) require("./middlewares/cors")(app);
  if (config.jwt) require("./middlewares/jwt")(app);
  if (config.inputValidation) require("./middlewares/inputValidation")(app);
  if (config.logger) require("./middlewares/logger")(app);
  if (config.session) require("./middlewares/session")(app);

  require("./middlewares/errorHandler")(app);
};
