import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  appliedClass: { type: String, required: true },
  previousSchool: { type: String, default: '' },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  },
  applicationDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Admission', admissionSchema);