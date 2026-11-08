import Student from '../models/Student.js';
import Parent from '../models/Parent.js';
import Result from '../models/Result.js';
import Payment from '../models/Payment.js';
import Notice from '../models/Notice.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

// --- STUDENT PORTAL ---
export const getStudentDashboard = async (req, res, next) => {
  try {
    const student = await Student.findOne({ userId: req.user._id }).populate('userId', 'name email');
    if (!student) throw new ApiError(404, 'Student profile not found');

    const results = await Result.find({ student: student._id, status: 'published' }).populate('examination', 'name');
    const payments = await Payment.find({ email: student.email || req.user.email }).sort({ createdAt: -1 });
    const notices = await Notice.find().sort({ date: -1 }).limit(5);

    new ApiResponse(200, { student, results, payments, notices }).send(res);
  } catch (error) { next(error); }
};

// --- PARENT PORTAL ---
export const getParentDashboard = async (req, res, next) => {
  try {
    const parent = await Parent.findOne({ userId: req.user._id }).populate('students', 'name rollNo class section');
    if (!parent) throw new ApiError(404, 'Parent profile not found');

    const studentIds = parent.students.map(s => s._id);
    const results = await Result.find({ student: { $in: studentIds }, status: 'published' })
      .populate('student', 'name rollNo class')
      .populate('examination', 'name');
    
    const notices = await Notice.find().sort({ date: -1 }).limit(5);

    new ApiResponse(200, { parent, students: parent.students, results, notices }).send(res);
  } catch (error) { next(error); }
};