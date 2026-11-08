import Academic from '../models/Academic.js';
import { ApiResponse } from '../utils/apiResponse.js';

export const getAcademics = async (req, res, next) => {
  try {
    const items = await Academic.find().sort({ createdAt: -1 });
    new ApiResponse(200, items).send(res);
  } catch (error) { next(error); }
};

export const createAcademic = async (req, res, next) => {
  try {
    const item = await Academic.create(req.body);
    new ApiResponse(201, item, 'Academic resource added').send(res);
  } catch (error) { next(error); }
};

export const updateAcademic = async (req, res, next) => {
  try {
    const item = await Academic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    new ApiResponse(200, item, 'Updated successfully').send(res);
  } catch (error) { next(error); }
};

export const deleteAcademic = async (req, res, next) => {
  try {
    await Academic.findByIdAndDelete(req.params.id);
    new ApiResponse(200, null, 'Deleted successfully').send(res);
  } catch (error) { next(error); }
};