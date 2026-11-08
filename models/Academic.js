import mongoose from 'mongoose';

const academicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Routine', 'Syllabus', 'Exam Schedule', 'Other'], required: true },
  description: { type: String, default: '' },
  link: { type: String, required: true }, // Google Drive link or direct file URL
  fileType: { type: String, enum: ['pdf', 'image', 'link'], default: 'pdf' }
}, { timestamps: true });

export default mongoose.model('Academic', academicSchema);