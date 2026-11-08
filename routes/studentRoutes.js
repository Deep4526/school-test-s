import express from 'express';
import { getStudents, createStudent, deleteStudent } from '../controllers/studentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', protect, adminOnly, getStudents);
router.post('/', protect, adminOnly, createStudent);
router.delete('/:id', protect, adminOnly, deleteStudent);

export default router;