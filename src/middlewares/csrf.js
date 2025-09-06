const csrf = require("csurf");

module.exports = (app, config = {}) => {
  app.use(csrf(config));
  app.use((err, req, res, next) => {
    if (err.code !== "EBADCSRFTOKEN") return next(err);
    res.status(403).json({ error: "CSRF token invalid or missing" });
  });

  console.log("CSRF protection enabled");
};
