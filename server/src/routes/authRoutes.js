import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController.js';
import { verifyToken, authorizeRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected User Route (Requires any valid authentication token)
router.get('/profile', verifyToken, getUserProfile);

// Admin-Only Route Example (Requires admin value in user role claim)
router.get('/admin-dashboard', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
});

export default router;
