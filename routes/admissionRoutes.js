import express from 'express';
import { applyAdmission, getAdmissions, updateAdmissionStatus } from '../controllers/admissionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/apply', applyAdmission);
router.get('/', protect, adminOnly, getAdmissions);
router.patch('/:id/status', protect, adminOnly, updateAdmissionStatus);

export default router;