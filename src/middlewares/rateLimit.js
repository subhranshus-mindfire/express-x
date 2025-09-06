const rateLimit = require("express-rate-limit");

module.exports = (app, config = {}) => {
  const limiter = rateLimit({
    windowMs: (config.rateLimit.windowMs || 15) * 60 * 1000,
    max: config.rateLimit.max || 100,
    message: config.message || "Too many requests, please try again later.",
  });

  app.use(limiter);
  console.log(`Rate Limiting enabled: ${limiter.max} requests per ${limiter.windowMs/60000} minutes`);
};
