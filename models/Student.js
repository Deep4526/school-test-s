import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  class: { type: String, required: true },
  section: { type: String, default: 'A' },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  dob: { type: Date, default: Date.now },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], default: 'Male' },
  address: { type: String, default: '' },
  admissionDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }
}, { timestamps: true });

export default mongoose.model('Student', studentSchema);
