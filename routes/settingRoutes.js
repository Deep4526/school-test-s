import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getSettings);                          // Public
router.put('/', protect, adminOnly, updateSettings);   // Admin only

export default router;
