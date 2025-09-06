module.exports = {
  helmet: true,
  rateLimit: { windowMs: 15 * 60 * 1000, max: 100 },
  csrf: true,
  cors: { origin: "*" },
  jwt: { secret: process.env.JWT_SECRET || "default_secret", expiresIn: "1h" },
  inputValidation: true,
  logger: true,
  session: { secret: process.env.SESSION_SECRET || "default_session_secret" },
  uploads: { maxSize: 1_000_000, allowedTypes: ["jpg", "jpeg", "png", "gif"] }
};
