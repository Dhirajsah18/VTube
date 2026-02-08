import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const optionalAuth = async (req, res, next) => {
  console.log("=== OPTIONAL AUTH DEBUG ===");
  console.log("Authorization header:", req.headers.authorization);
  console.log("All headers:", req.headers);
  console.log("==========================");

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      req.user = null;
      return next();
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded._id).select("-password");
    req.user = user || null;

    next();
  } catch (err) {
    console.error("JWT VERIFY ERROR:", err.message);
    req.user = null;
    next();
  }
};

