import Book from '../models/Book.js';
import IslamicArticle from '../models/IslamicArticle.js';
import Lecture from '../models/Lecture.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

// Generic CRUD helper
const createCRUD = (Model) => ({
  getAll: async (req, res, next) => { try { new ApiResponse(200, await Model.find().sort({createdAt:-1})).send(res); } catch(e){ next(e); } },
  create: async (req, res, next) => { try { new ApiResponse(201, await Model.create(req.body), 'Created').send(res); } catch(e){ next(e); } },
  delete: async (req, res, next) => { try { await Model.findByIdAndDelete(req.params.id); new ApiResponse(200, null, 'Deleted').send(res); } catch(e){ next(e); } }
});

const bookCtrl = createCRUD(Book);
const articleCtrl = createCRUD(IslamicArticle);
const lectureCtrl = createCRUD(Lecture);

export const getBooks = bookCtrl.getAll;
export const createBook = bookCtrl.create;
export const deleteBook = bookCtrl.delete;

export const getArticles = articleCtrl.getAll;
export const createArticle = articleCtrl.create;
export const deleteArticle = articleCtrl.delete;

export const getLectures = lectureCtrl.getAll;
export const createLecture = lectureCtrl.create;
export const deleteLecture = lectureCtrl.delete;
