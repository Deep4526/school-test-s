import Teacher from '../models/Teacher.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

export const getTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    new ApiResponse(200, teachers).send(res);
  } catch (error) { next(error); }
};

export const createTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.create(req.body);
    new ApiResponse(201, teacher, 'Teacher added').send(res);
  } catch (error) { next(error); }
};

export const deleteTeacher = async (req, res, next) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    new ApiResponse(200, null, 'Teacher deleted').send(res);
  } catch (error) { next(error); }
};
