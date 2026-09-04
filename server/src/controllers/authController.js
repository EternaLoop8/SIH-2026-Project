import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Helper to generate a token string
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, companyName, description, category } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      role,
      ...(role === 'business' && { companyName, description, category }),
    });

    // Generate JWT token...
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Add this temporary line to monitor internal strings in your terminal:
  console.log("DEBUG: Your current JWT_SECRET is:", process.env.JWT_SECRET);


  try {
    // Manually selecting +password because `select: false` hides it by default
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile data (Demonstration of Protected Resource)
// @route   GET /api/auth/profile
export const getUserProfile = async (req, res) => {
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};
