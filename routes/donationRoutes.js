import express from 'express';
import { createDonation, getDonations } from '../controllers/donationController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', createDonation);
router.get('/', protect, adminOnly, getDonations);

export default router;