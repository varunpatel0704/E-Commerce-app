import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.class.js';
import Order from '../models/order.model.js';
import { stripe } from "../app.js";
import ApiResponse from '../utils/ApiResponse.class.js';

const createPaymentIntent = asyncHandler(async function(req, res, next){
  const {amount} = req.body;
  console.log('create payment intent request received', req.body);
  if(!amount) return next(new ApiError(400, 'amount is required to create payment intent'));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Number(amount) * 100,
    currency: 'inr',
  })

  return res.status(201).json(new ApiResponse(201, 'Payment intent created', {client_secret: paymentIntent.client_secret}));
});

const newOrder = asyncHandler(async function(req, res, next){
  const {shippingAddress, userId, orderItems, priceDetails, paymentId, paymentStatus } = req.body;
  


});

export {createPaymentIntent, newOrder};