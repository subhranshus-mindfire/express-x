const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "default_jwt_secret";

module.exports = {
  generateToken: (payload, expiresIn = "1h") => jwt.sign(payload, secret, { expiresIn }),
  verifyToken: (token) => jwt.verify(token, secret),
  middleware: () => (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
      req.user = jwt.verify(token, secret);
      next();
    } catch (err) {
      res.status(403).json({ error: "Forbidden" });
    }
  },
};
