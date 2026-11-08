import mongoose from 'mongoose';
const lectureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  speaker: { type: String, required: true },
  type: { type: String, enum: ['Audio', 'Video'], default: 'Video' },
  url: { type: String, required: true }, // YouTube link or audio file URL
  category: { type: String, default: 'General' }
}, { timestamps: true });
export default mongoose.model('Lecture', lectureSchema);