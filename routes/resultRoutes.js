import express from 'express';
import { saveResult, getResultsByExam, searchResult } from '../controllers/resultController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, adminOnly, saveResult);
router.get('/exam/:examId', protect, adminOnly, getResultsByExam);
router.post('/search', searchResult);

export default router;