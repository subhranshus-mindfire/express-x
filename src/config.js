require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV || "development",

  // Rate limiting
  rateLimit: {
    windowMs: process.env.RATE_LIMIT_WINDOW_MS
      ? parseInt(process.env.RATE_LIMIT_WINDOW_MS)
      : 15 * 60 * 1000, // 15 minutes
    max: process.env.RATE_LIMIT_MAX
      ? parseInt(process.env.RATE_LIMIT_MAX)
      : 100, // requests per window per IP
  },

  // CORS
  cors: {
    origins: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(",")
      : ["http://localhost:3000"],
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || "changeme-secret",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },

  // Session cookies
  session: {
    secret: process.env.SESSION_SECRET || "changeme-session",
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    },
  },


  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
  },
};
