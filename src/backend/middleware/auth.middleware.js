import  User  from "../models/User.models.js";
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Verify token (throws error if invalid)
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );  

    // Check token payload format
    if (!decoded?.userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Find user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user object to request
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Invalid authentication token" });
  }
};
