import Notice from '../models/Notice.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

// @desc    Get all notices (Public)
export const getNotices = async (req, res, next) => {
  try {
    const { category, search, limit } = req.query;
    const filter = {};

    if (category && category !== 'All') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const query = Notice.find(filter).sort({ date: -1 });
    if (limit) {
      query.limit(Number(limit));
    }

    const notices = await query;
    new ApiResponse(200, notices).send(res);
  } catch (error) { next(error); }
};

// @desc    Get single notice (Public)
export const getNoticeById = async (req, res, next) => {
  try {
    const notice = await Notice.findById(req.params.id);
    if (!notice) throw new ApiError(404, 'Notice not found');
    new ApiResponse(200, notice).send(res);
  } catch (error) { next(error); }
};

// @desc    Create notice (Admin)
export const createNotice = async (req, res, next) => {
  try {
    const notice = await Notice.create({ ...req.body, createdBy: req.user.id });
    new ApiResponse(201, notice, 'Notice created').send(res);
  } catch (error) { next(error); }
};

// @desc    Update notice (Admin)
export const updateNotice = async (req, res, next) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!notice) throw new ApiError(404, 'Notice not found');
    new ApiResponse(200, notice, 'Notice updated successfully').send(res);
  } catch (error) { next(error); }
};

// @desc    Delete notice (Admin)
export const deleteNotice = async (req, res, next) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    new ApiResponse(200, null, 'Notice deleted').send(res);
  } catch (error) { next(error); }
};