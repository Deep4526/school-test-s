import Examination from '../models/Examination.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getExams = async (req, res, next) => {
  try {
    const exams = await Examination.find().sort({ createdAt: -1 });
    new ApiResponse(200, exams).send(res);
  } catch (error) { next(error); }
};

export const createExam = async (req, res, next) => {
  try {
    const exam = await Examination.create(req.body);
    new ApiResponse(201, exam, 'Exam created').send(res);
  } catch (error) { next(error); }
};

export const deleteExam = async (req, res, next) => {
  try {
    await Examination.findByIdAndDelete(req.params.id);
    new ApiResponse(200, null, 'Exam deleted').send(res);
  } catch (error) { next(error); }
};
