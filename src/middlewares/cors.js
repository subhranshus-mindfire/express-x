const cors = require("cors");

module.exports = (app) => {
  const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || ["http://localhost:3000"];
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  console.log("CORS enabled for:", allowedOrigins);
};
