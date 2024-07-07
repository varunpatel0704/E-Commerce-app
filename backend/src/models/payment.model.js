import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  trxnId:{
    type: Number,
    // required: [true, 'trxnId is required']
  },

  method:{
    type: String,
    required: [true, 'payment method is required'],
    enum: ['Cash, Card, Upi']
  },

  amount: {
    type: Number,
    required: [true, 'payment amount is required']
  },

  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  paidFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },

  status: {
    type: String,
    enum: ['pending', 'complete', 'refunded']
  }

}, {timestamps : true});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;