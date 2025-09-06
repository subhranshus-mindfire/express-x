const { body, validationResult } = require("express-validator");

module.exports = (app) => {
  app.post("/validate-user",
    body("username").isAlphanumeric(),
    body("email").isEmail(),
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.json({ message: "Validation passed" });
    }
  );

  console.log("Input Validation enabled");
};
