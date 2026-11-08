import mongoose from 'mongoose';
const deptSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., Hifz, Noorani
  description: { type: String, required: true },
  headName: { type: String, default: '' },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });
export default mongoose.model('Department', deptSchema);