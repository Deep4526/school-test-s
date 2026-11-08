import mongoose from 'mongoose';
const gallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, // Image or Video URL
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  category: { type: String, default: 'General' }
}, { timestamps: true });
export default mongoose.model('Gallery', gallerySchema);