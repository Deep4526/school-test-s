import express from 'express';
import { getNotices, getNoticeById, createNotice, updateNotice, deleteNotice } from '../controllers/noticeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', getNotices); // Public
router.get('/:id', getNoticeById); // Public
router.post('/', protect, adminOnly, createNotice); // Admin only
router.put('/:id', protect, adminOnly, updateNotice); // Admin only
router.delete('/:id', protect, adminOnly, deleteNotice); // Admin only

export default router;