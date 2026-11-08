import mongoose from 'mongoose';
const downloadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true }, // PDF URL
  category: { type: String, enum: ['Admission Form', 'Routine', 'Syllabus', 'Notice', 'Other'], default: 'Other' }
}, { timestamps: true });
export default mongoose.model('Download', downloadSchema);