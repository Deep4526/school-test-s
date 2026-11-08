import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// @desc    Register user
// @route   POST /api/auth/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) throw new ApiError(400, 'User already exists');

    const user = await User.create({ name, email, password, role: role || 'student' });
    
    new ApiResponse(201, {
      _id: user._id, name: user.name, email: user.email, role: user.role,
      token: generateToken(user._id)
    }, 'User registered successfully').send(res);
  } catch (error) { next(error); }
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user && (await user.matchPassword(password))) {
      new ApiResponse(200, {
        _id: user._id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id)
      }, 'Login successful').send(res);
    } else {
      throw new ApiError(401, 'Invalid email or password');
    }
  } catch (error) { next(error); }
};

// @desc    Get current user
// @route   GET /api/auth/me
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    new ApiResponse(200, user).send(res);
  } catch (error) { next(error); }
};