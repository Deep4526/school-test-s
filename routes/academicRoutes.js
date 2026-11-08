import express from 'express';
import { getAcademics, createAcademic, updateAcademic, deleteAcademic } from '../controllers/academicController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getAcademics); // Public
router.post('/', protect, adminOnly, createAcademic);
router.put('/:id', protect, adminOnly, updateAcademic);
router.delete('/:id', protect, adminOnly, deleteAcademic);

export default router;