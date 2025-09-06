const rateLimit = require("express-rate-limit");

module.exports = (app) => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);
  console.log("⚡ Rate Limiting enabled");
};
