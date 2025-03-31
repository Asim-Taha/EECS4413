import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req, res, next) => {
  try {
    // Authorization header
    const authHeader = req.header("Authorization");

    // if header exists
    if (!authHeader) {
      return res.status(401).json({ message: "No authorization header found" });
    }

    // Get token
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.replace("Bearer ", "")
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attaching the user info to request
    req.user = decoded;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.error("JWT Authentication Error:", err);
    return res.status(500).json({
      message: "Server error during authentication",
    });
  }
};

export default authenticateToken;
