import Class from '../models/Class.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

export const getClasses = async (req, res, next) => {
  try {
    const classes = await Class.find().sort({ name: 1 });
    new ApiResponse(200, classes).send(res);
  } catch (error) { next(error); }
};

export const createClass = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const exists = await Class.findOne({ name });
    if (exists) throw new ApiError(400, 'Class already exists');
    const newClass = await Class.create({ name, description });
    new ApiResponse(201, newClass, 'Class created successfully').send(res);
  } catch (error) { next(error); }
};

export const updateClass = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const updated = await Class.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!updated) throw new ApiError(404, 'Class not found');
    new ApiResponse(200, updated, 'Class updated successfully').send(res);
  } catch (error) { next(error); }
};

export const deleteClass = async (req, res, next) => {
  try {
    const deleted = await Class.findByIdAndDelete(req.params.id);
    if (!deleted) throw new ApiError(404, 'Class not found');
    new ApiResponse(200, null, 'Class deleted successfully').send(res);
  } catch (error) { next(error); }
};
