import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  type: { type: String, enum: ['Completion', 'Character', 'Achievement'], required: true },
  certificateNo: { type: String, required: true, unique: true },
  issueDate: { type: Date, default: Date.now },
  details: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Certificate', certificateSchema);