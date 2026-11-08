import mongoose from 'mongoose';

const examinationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Final Term 2026"
  class: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' }
}, { timestamps: true });

export default mongoose.model('Examination', examinationSchema);