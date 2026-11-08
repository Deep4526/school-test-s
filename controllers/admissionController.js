import Admission from '../models/Admission.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

// @desc    Public: Submit admission application
export const applyAdmission = async (req, res, next) => {
  try {
    const application = await Admission.create(req.body);
    new ApiResponse(201, application, 'Application submitted successfully').send(res);
  } catch (error) { next(error); }
};

// @desc    Admin: Get all applications
export const getAdmissions = async (req, res, next) => {
  try {
    const applications = await Admission.find().sort({ applicationDate: -1 });
    new ApiResponse(200, applications).send(res);
  } catch (error) { next(error); }
};

// @desc    Admin: Update application status
export const updateAdmissionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const application = await Admission.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!application) throw new ApiError(404, 'Application not found');
    new ApiResponse(200, application, 'Status updated').send(res);
  } catch (error) { next(error); }
};
