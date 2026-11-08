import mongoose from 'mongoose';
const committeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true }, // e.g., President, Secretary
  imageUrl: { type: String, default: '' },
  phone: { type: String, default: '' }
}, { timestamps: true });
export default mongoose.model('Committee', committeeSchema);