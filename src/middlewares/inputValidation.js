const { body, validationResult } = require("express-validator");

module.exports = (app) => {
  app.post(
    "/user",
    body("username").isAlphanumeric(),
    body("email").isEmail(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  );
  console.log("Input Validation enabled on /user");
};
