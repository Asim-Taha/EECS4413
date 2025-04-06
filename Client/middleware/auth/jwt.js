import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authenticateToken = (req, res, next) => {
  try {
    // 1. Get token from cookies (instead of headers)
    const token = req.cookies?.session;
    console.log("🔐 Token received in cookie:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided in cookies" });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Attach user to request object
    req.user = decoded;

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }

    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.error("JWT Auth Error:", err);
    return res.status(500).json({ message: "Server error during authentication" });
    
  }
};

export default authenticateToken;
