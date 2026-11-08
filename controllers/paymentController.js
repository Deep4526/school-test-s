import Razorpay from 'razorpay';
import crypto from 'crypto';
import Payment from '../models/Payment.js';
import { ApiResponse, ApiError } from '../utils/apiResponse.js';

const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || key_id === 'your_razorpay_key_id') {
    throw new ApiError(500, 'Razorpay API keys are not configured in environment variables');
  }
  return new Razorpay({ key_id, key_secret });
};

// Create Order
export const createOrder = async (req, res, next) => {
  try {
    const { amount, type, payerName, email, phone } = req.body;
    
    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create(options);
    
    // Save initial payment record
    const payment = await Payment.create({
      payerName, email, phone, amount, type,
      razorpayOrderId: order.id,
      status: 'Created'
    });

    new ApiResponse(200, { orderId: order.id, paymentId: payment._id }, 'Order created').send(res);
  } catch (error) { next(error); }
};

// Verify Payment
export const verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    if (!key_secret || key_secret === 'your_razorpay_key_secret') {
      throw new ApiError(500, 'Razorpay secret key is not configured');
    }

    // Verify signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', key_secret)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      await Payment.findByIdAndUpdate(paymentId, {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'Paid'
      });
      new ApiResponse(200, null, 'Payment verified successfully').send(res);
    } else {
      await Payment.findByIdAndUpdate(paymentId, { status: 'Failed' });
      throw new ApiError(400, 'Invalid payment signature');
    }
  } catch (error) { next(error); }
};

// Admin: Get all payments
export const getPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    new ApiResponse(200, payments).send(res);
  } catch (error) { next(error); }
};

