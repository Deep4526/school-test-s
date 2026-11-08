import mongoose from 'mongoose';
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, enum: ['Islamic', 'Academic', 'Story', 'Science'], default: 'Islamic' },
  isbn: { type: String, default: '' },
  available: { type: Boolean, default: true }
}, { timestamps: true });
export default mongoose.model('Book', bookSchema);