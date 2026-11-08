import mongoose from 'mongoose';
const alumniSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batch: { type: String, required: true },
  currentJob: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, default: '' }
}, { timestamps: true });
export default mongoose.model('Alumni', alumniSchema);