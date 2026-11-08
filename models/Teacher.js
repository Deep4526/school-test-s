import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  qualification: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, default: '' }, // URL
  joiningDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Teacher', teacherSchema);