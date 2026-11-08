import express from 'express';
import { getTeachers, createTeacher, deleteTeacher } from '../controllers/teacherController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', protect, adminOnly, getTeachers);
router.post('/', protect, adminOnly, createTeacher);
router.delete('/:id', protect, adminOnly, deleteTeacher);

export default router;