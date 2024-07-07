import mongoose from 'mongoose';

const priceSchema = new mongoose.Schema({
  subTotal:Number,
  tax: Number,
  discount: Number,
  shippingCharges: Number,
  total: Number,
})

const orderSchema = new mongoose.Schema({
  orderedBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required to place order']
  },

  orderItem:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'product is required to place order']
  },
  
  qty: {
    type: Number,
    required: [true, 'qty is required to place order']
  },

  orderDate:{
    type: Date,
    required: true
  },

  paymentInfo:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },

  status: {
    type: String,
    default: 'Processing'
  },

  priceDetails:{
    type: priceSchema,
    required: true
  },

  // shippingAddress:{
  //   type: addressSchema,
  //   required: [true, 'shipping details are required to place order']
  // }

}, {timestamps : true});

const Order = mongoose.model('Order', orderSchema);

export default Order;