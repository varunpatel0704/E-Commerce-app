import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  couponCode:{
    type: String,
    required: [true, 'coupon code is required']
  },

  validTill: {
    type: Date,
    required: [true, 'coupon validity is required']
  }

}, {timestamps : true});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;