import jwt from 'jsonwebtoken';
import User from '../Models/User.js';

// Protect Route Middleware
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized - Invalid Token' });
  }
};

// Admin Route Middleware
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); // Proceed to the next middleware or route handler
  }
  res.status(403).json({ error: 'Forbidden - Admins only' });
};
