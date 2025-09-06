const helmet = require("helmet");

module.exports = (app, config = {}) => {
  const cspOptions = config.csp || false;

  app.use(
    helmet({
      contentSecurityPolicy: cspOptions,
    })
  );

  console.log("Helmet enabled", cspOptions ? "with CSP" : "without CSP");
};
