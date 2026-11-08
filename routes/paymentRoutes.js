import express from 'express';
import { createOrder, verifyPayment, getPayments } from '../controllers/paymentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/create-order', createOrder);
router.post('/verify', verifyPayment);
router.get('/', protect, adminOnly, getPayments);

export default router;