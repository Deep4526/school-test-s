import express from 'express';
import { registerAlumni, getAlumni, deleteAlumni, applyMembership, getMemberships, updateMembership } from '../controllers/communityController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/alumni', registerAlumni); router.get('/alumni', getAlumni); router.delete('/alumni/:id', protect, adminOnly, deleteAlumni);
router.post('/membership', applyMembership); router.get('/membership', protect, adminOnly, getMemberships); router.patch('/membership/:id', protect, adminOnly, updateMembership);
export default router;