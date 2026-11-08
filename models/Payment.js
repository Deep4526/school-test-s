import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  payerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['Admission Fee', 'Tuition Fee', 'Exam Fee', 'Other'], required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String, default: '' },
  razorpaySignature: { type: String, default: '' },
  status: { type: String, enum: ['Created', 'Paid', 'Failed'], default: 'Created' }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);