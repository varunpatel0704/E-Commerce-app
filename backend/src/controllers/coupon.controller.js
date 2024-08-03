import Coupon from '../models/coupon.model.js';
import ApiResponse from "../utils/ApiResponse.class.js";
import ApiError from '../utils/ApiError.class.js'
import asyncHandler from "../utils/asyncHandler.js";

const addCoupon = asyncHandler(async function(req, res, next){
  console.log('adding coupon');
  const {couponCode, validTill, discount} = req.body;
  const existingCoupon = await Coupon.findOne({couponCode});
  if(existingCoupon){
    console.log('existing coupon');

    existingCoupon.validTill = new Date(validTill);
    existingCoupon.discount = discount;

    existingCoupon.save();
    return res.status(200).json(new ApiResponse(200, 'Coupon already exists, validity updated'));
  }
  const newCoupon = new Coupon({
    couponCode,
    validTill: new Date(validTill),
    discount
  });
  newCoupon.save();
  return res.status(200).json(new ApiResponse(200, "Coupon addedd"));
})

const getCoupon = asyncHandler(async function(req, res, next){
  const {couponCode} = req.params || req.body;
  const existingCoupon = await Coupon.findOne({couponCode: couponCode.toUpperCase()});
  if(!existingCoupon) return next(new ApiError(400, 'Invalid Coupon'));

  return res.status(200).json(new ApiResponse(200, 'Coupon validated', existingCoupon));
})

// const getAllCoupons = asyncHandler(async function(req, res, next){
//   const coupons = await Coupon.find({validTill: {$gte: new Date()}});
//   if(!coupons.length) return next(new ApiError(404, 'No coupons found'));

//   return res.status(200).json(new ApiResponse(200, 'Fetched valid coupons', coupons));
// })

export { addCoupon, getCoupon };
