const session = require("express-session");

module.exports = (app, config = {}) => {
  const secret = process.env.SESSION_SECRET || config.secret || "default_session_secret";

  app.use(
    session({
      secret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: config.secure || false,
        httpOnly: config.httpOnly !== undefined ? config.httpOnly : true,
      },
    })
  );

  console.log("Session enabled:", `secure=${config.secure}, httpOnly=${config.httpOnly}`);
};
