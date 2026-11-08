import Result from '../models/Result.js';
import Student from '../models/Student.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

// Admin: Create/Update Result
export const saveResult = async (req, res, next) => {
  try {
    const result = await Result.findOneAndUpdate(
      { student: req.body.student, examination: req.body.examination },
      req.body,
      { upsert: true, new: true }
    );
    new ApiResponse(200, result, 'Result saved').send(res);
  } catch (error) { next(error); }
};

// Admin: Get Results for an Exam
export const getResultsByExam = async (req, res, next) => {
  try {
    const results = await Result.find({ examination: req.params.examId }).populate('student', 'name rollNo class');
    new ApiResponse(200, results).send(res);
  } catch (error) { next(error); }
};

// Public: Search Result by Roll No
export const searchResult = async (req, res, next) => {
  try {
    const { rollNo, examId } = req.body;
    const student = await Student.findOne({ rollNo });
    if (!student) throw new ApiError(404, 'Student not found with this Roll No');

    const result = await Result.findOne({ student: student._id, examination: examId, status: 'published' })
      .populate('examination', 'name class');
      
    if (!result) throw new ApiError(404, 'Result not found or not published yet');
    
    new ApiResponse(200, { student, result }).send(res);
  } catch (error) { next(error); }
};
