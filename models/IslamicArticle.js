import mongoose from 'mongoose';
const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, enum: ['Masala-Masayel', 'Daily Practices', 'History', 'General'], default: 'General' },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' }
}, { timestamps: true });
export default mongoose.model('IslamicArticle', articleSchema);