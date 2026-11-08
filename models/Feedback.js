import mongoose from 'mongoose';
const feedbackSchema = new mongoose.Schema({
  parentName: { type: String, required: true },
  studentName: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' }
}, { timestamps: true });
export default mongoose.model('Feedback', feedbackSchema);