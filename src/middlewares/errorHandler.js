const config = require("../config");

module.exports = (app) => {
  app.use((err, req, res, next) => {
    console.error(err.stack);

    if (config.env === "production") {
      return res.status(500).json({ error: "Server Error" });
    }

    res.status(500).json({ error: err.message, stack: err.stack });
  });

  console.log("Error Handler enabled (stack traces hidden in production)");
};
