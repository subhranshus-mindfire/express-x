const rateLimit = require("express-rate-limit");

module.exports = (app, config = {}) => {
  console.log(config)
  const limiter = rateLimit({
    windowMs: (config.windowMs || 15) * 60 * 1000,
    max: config.max || 100,
    message: config.message || "Too many requests, please try again later.",
  });

  app.use(limiter);
  console.log(`Rate Limiting enabled: ${config.max} requests per ${config.windowMs/60000} minutes`);
};
