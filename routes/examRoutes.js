import express from 'express';
import { getExams, createExam, deleteExam } from '../controllers/examController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getExams);
router.post('/', protect, adminOnly, createExam);
router.delete('/:id', protect, adminOnly, deleteExam);

export default router;