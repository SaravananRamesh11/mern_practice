const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token,"erxfcgvhgjxfcgvhb"); // Make sure JWT_SECRET is set in your .env
    req.user = decoded; // Attach user data to the request
    next(); // Proceed to the next middleware/route
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};


const checkAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user data found." });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only." });
  }

  next(); // Role is admin, proceed
};


// ProtectedRoute.jsx







module.exports = {verifyToken,checkAdmin};
