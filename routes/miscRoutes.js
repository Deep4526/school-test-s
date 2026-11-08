import express from 'express';
import { getGalleries, createGallery, deleteGallery, getDownloads, createDownload, deleteDownload, getPress, createPress, deletePress, getEvents, createEvent, deleteEvent, getDepts, createDept, deleteDept, getMagazines, createMagazine, deleteMagazine, getCommittees, createCommittee, deleteCommittee, createFeedback, getFeedbacks, updateFeedbackStatus, getPublicDonors } from '../controllers/miscController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/galleries', getGalleries); router.post('/galleries', protect, adminOnly, createGallery); router.delete('/galleries/:id', protect, adminOnly, deleteGallery);
router.get('/downloads', getDownloads); router.post('/downloads', protect, adminOnly, createDownload); router.delete('/downloads/:id', protect, adminOnly, deleteDownload);
router.get('/press', getPress); router.post('/press', protect, adminOnly, createPress); router.delete('/press/:id', protect, adminOnly, deletePress);
router.get('/events', getEvents); router.post('/events', protect, adminOnly, createEvent); router.delete('/events/:id', protect, adminOnly, deleteEvent);
router.get('/departments', getDepts); router.post('/departments', protect, adminOnly, createDept); router.delete('/departments/:id', protect, adminOnly, deleteDept);
router.get('/magazines', getMagazines); router.post('/magazines', protect, adminOnly, createMagazine); router.delete('/magazines/:id', protect, adminOnly, deleteMagazine);
router.get('/committees', getCommittees); router.post('/committees', protect, adminOnly, createCommittee); router.delete('/committees/:id', protect, adminOnly, deleteCommittee);
router.post('/feedback', createFeedback); router.get('/feedback', protect, adminOnly, getFeedbacks); router.patch('/feedback/:id', protect, adminOnly, updateFeedbackStatus);
router.get('/donors', getPublicDonors);
export default router;