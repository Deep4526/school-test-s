import express from 'express';
import { generateCertificate, getCertificates, verifyCertificate } from '../controllers/certificateController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', protect, adminOnly, generateCertificate);
router.get('/', protect, adminOnly, getCertificates);
router.get('/verify/:id', verifyCertificate);

export default router;