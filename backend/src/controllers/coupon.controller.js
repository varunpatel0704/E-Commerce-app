import ApiError from "../utils/ApiError.class.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import Coupon from '../models/coupon.model.js'

const addCoupon = asyncHandler(async function(req, res, next){
  const {couponCode, validTill} = req.body;
  const existingCoupon = await Coupon.findOne({couponCode});
  if(existingCoupon){
    existingCoupon.validTill = validTill;
    existingCoupon.save();
    return res.staus(200).json(new ApiResponse(200, 'Coupon already exists, validity updated'));
  }
  const newCoupon = new Coupon({
    couponCode,
    validTill
  });
  newCoupon.save();
  return res.status(200).json(new ApiResponse(200, "Coupon addedd"));
})

export {addCoupon};