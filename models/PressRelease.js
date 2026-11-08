import mongoose from 'mongoose';
const pressSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });
export default mongoose.model('PressRelease', pressSchema);

