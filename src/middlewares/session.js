const session = require("express-session");
const config = require("../config");

module.exports = (app) => {
  app.use(
    session({
      secret: config.session.secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: config.session.cookie.secure, 
        httpOnly: config.session.cookie.httpOnly,
        maxAge: 1000 * 60 * 60,
      },
    })
  );

  console.log("Secure Session Cookies enabled");
};
