const cors = require("cors");

module.exports = (app, config = {}) => {
  const allowedOrigins =
    (config.origin && config.origin.length ? config.origin : null) ||
    process.env.CORS_ORIGINS?.split(",") ||
    ["http://localhost:3000"];

  const corsOptions = {
    origin: allowedOrigins,
    credentials: true,
    methods: (config.methods && config.methods.length ? config.methods : ["GET","POST","PUT","DELETE"]),
    allowedHeaders: (config.allowedHeaders && config.allowedHeaders.length ? config.allowedHeaders : ["Content-Type", "Authorization"]),
  };

  app.use(cors(corsOptions));
  console.log("CORS enabled for:", allowedOrigins);
};
