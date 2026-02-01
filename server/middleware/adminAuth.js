import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware to verify admin access
 * Checks if user has valid JWT token AND admin role
 */
export const verifyAdmin = async (req, res, next) => {
  try {
    // Get token from authorization header
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find user and check role
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required. You do not have permission to access this resource." });
    }

    // Attach user to request for use in route handlers
    req.userId = decoded.id;
    req.user = user;
    
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired. Please login again." });
    }
    
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.error("ADMIN AUTH ERROR:", error);
    res.status(500).json({ message: "Authentication error" });
  }
};

/**
 * Middleware to verify user authentication (not necessarily admin)
 * Can be reused from your existing token verification
 */
export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
