const csrf = require("csurf");

module.exports = (app) => {
  app.use(csrf());
  app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
  });
  console.log(" CSRF Protection enabled");
};
