import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Zakat', 'Sadaqah', 'Orphan Fund', 'General'], default: 'General' },
  isAnonymous: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
  razorpayPaymentId: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Donation', donationSchema);