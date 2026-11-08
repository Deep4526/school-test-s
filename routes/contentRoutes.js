import express from 'express';
import { getBooks, createBook, deleteBook, getArticles, createArticle, deleteArticle, getLectures, createLecture, deleteLecture } from '../controllers/contentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/books', getBooks); router.post('/books', protect, adminOnly, createBook); router.delete('/books/:id', protect, adminOnly, deleteBook);
router.get('/articles', getArticles); router.post('/articles', protect, adminOnly, createArticle); router.delete('/articles/:id', protect, adminOnly, deleteArticle);
router.get('/lectures', getLectures); router.post('/lectures', protect, adminOnly, createLecture); router.delete('/lectures/:id', protect, adminOnly, deleteLecture);
export default router;