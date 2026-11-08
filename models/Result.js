import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  examination: { type: mongoose.Schema.Types.ObjectId, ref: 'Examination', required: true },
  subjects: [{
    name: { type: String, required: true },
    marks: { type: Number, required: true },
    grade: { type: String, required: true }
  }],
  totalMarks: { type: Number, required: true },
  gpa: { type: Number, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' }
}, { timestamps: true });

export default mongoose.model('Result', resultSchema);