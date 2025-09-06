const helmet = require("helmet");

module.exports = (app) => {
  app.use(helmet());
  console.log("Helmet enabled");
};
