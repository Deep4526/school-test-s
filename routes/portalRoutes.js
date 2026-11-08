import express from 'express';
import { getStudentDashboard, getParentDashboard } from '../controllers/portalController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Student Routes
router.get('/student/dashboard', protect, getStudentDashboard);

// Parent Routes
router.get('/parent/dashboard', protect, getParentDashboard);

export default router;