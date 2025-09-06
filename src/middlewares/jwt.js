const jwt = require("jsonwebtoken");

module.exports = (app) => {
  app.use((req, res, next) => {
    if (req.path.startsWith("/auth")) return next();

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  });

  console.log("JWT Authentication enabled");
};
