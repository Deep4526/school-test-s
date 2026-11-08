import Student from '../models/Student.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

export const getStudents = async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    new ApiResponse(200, students).send(res);
  } catch (error) { next(error); }
};

export const createStudent = async (req, res, next) => {
  try {
    const student = await Student.create(req.body);
    new ApiResponse(201, student, 'Student added').send(res);
  } catch (error) { next(error); }
};

export const deleteStudent = async (req, res, next) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    new ApiResponse(200, null, 'Student deleted').send(res);
  } catch (error) { next(error); }
};
