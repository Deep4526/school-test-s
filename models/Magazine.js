import mongoose from 'mongoose';
const magazineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  coverImageUrl: { type: String, default: '' }
}, { timestamps: true });
export default mongoose.model('Magazine', magazineSchema);