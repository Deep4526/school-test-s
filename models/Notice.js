import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['General', 'Admission', 'Exam', 'Holiday', 'Event'], default: 'General' },
  date: { type: Date, default: Date.now },
  isImportant: { type: Boolean, default: false },
  attachment: { type: String, default: '' }, // Cloudinary URL
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

noticeSchema.index({ date: -1 }); // Sort by newest

export default mongoose.model('Notice', noticeSchema);