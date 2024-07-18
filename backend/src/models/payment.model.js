import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  trxnId:{
    type: Number,
    required: [true, 'trxnId is required']
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

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  // orderId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Order'
  // },

  status: {
    type: String,
    enum: ['Pending', 'Complete', 'Refunded']
  }

}, {timestamps : true});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;