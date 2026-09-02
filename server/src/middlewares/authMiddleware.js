import jwt from 'jsonwebtoken';
import User from "../models/User.js";

// Protect routes - verifies token legitimacy
export const verifyToken = async (req, res, next) => {
  let token;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user context from db without password and append to request lifecycle
      req.user = await User.findById(decoded.id);
      
      if (!req.user) {
        return res.status(401).json({ message: 'User not found, unauthorized' });
      }

      next();
    } catch (error) {
      return res.status(403).json({ message: 'Token signature invalid or expired' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token payload provided' });
  }
};

// Authorize targeted roles
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: `Forbidden: Role '${req.user?.role || 'Guest'}' lacks access.` });
    }
    next();
  };
};
