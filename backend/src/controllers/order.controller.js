import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.class.js';
import Order from '../models/order.model.js';
import { stripe } from "../app.js";
import ApiResponse from '../utils/ApiResponse.class.js';
import User from '../models/user.model.js';
import Payment from '../models/payment.model.js';

async function reduceStock(orderItems){

};

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
  const {shippingAddress, userInfo, orderItems, priceDetails, paymentInfo } = req.body;
  console.log('new order request received', req.body);
  // steps to place order.
  // 1. get the relevant details.
  // 2. create a order document.
  // 3. fill-in the received details => above destructured properties.
  // 4. derive the remaining details => payment info, order date, order status if not provided
  // 5. create a payment info document.
  // 6. save the payment info id in the order document and order id in the payment info object.
  // 7. update the product qtys 
  // 8. place the order.
  const user = await User.findOne({email: userInfo.userId}); // to get mongo _id which will be included in the order object.
  const newOrder = new Order({
    userId: user._id,
    fullName: user.fullName,
    phoneNumber: user.phoneNumber,
    shippingAddress,
    priceDetails,
    orderItems,
  })
  // also add the new order to the user's orders array.
  user.orders.push(newOrder._id);
  user.save();

  // reduce the existing stock
  reduceStock(orderItems);

  // create payment document
  const newPayment = new Payment({
    trxnId: paymentInfo.paymentId,
    orderId: newOrder._id,
    userId: user._id,
    amount: priceDetails.total,
    method: paymentInfo.method,
    status: paymentInfo.status,
  })
  
  newPayment.save(); // don't need to await this one.
  
  // add the paymentInfo document id to the order document.
  newOrder.paymentInfo = newPayment._id;  
  const savedOrder = await newOrder.save()

  return res.status(200).json(new ApiResponse(200, 'Order placed successfully', savedOrder));
});

const getOrder = asyncHandler(async function(req, res, next){
  const {orderId} = req.params;
  
  const order = await Order.findById(orderId).populate('paymentInfo');
  if(!order) return next(new ApiError(404, 'Order not found'));

  return res.status(200).json(new ApiResponse(200, 'Fetched requested order', order));
});

const getOrders = asyncHandler(async function(req, res, next){
  const {userId} = req.params;

  // email is expected for faster user search, which in turn contains the orders placed by that user.
  const user = await User.findOne({email: userId}).populate('orders');

  const orders = user.orders;
  if(!orders.length) return next(new ApiError(404, 'No orders found'));

  return res.status(200).json(new ApiResponse(200, 'Fetched requested orders', orders));

});

const getAllOrders = asyncHandler(async function(req, res, next){
  const allOrders = await Order.find({});
  if(!allOrders.length) return next(new ApiError(404, 'No orders found'));

  return res.status(200).json(new ApiResponse(200, 'Fetched all orders', allOrders));
});

export {createPaymentIntent, newOrder, getOrder, getOrders, getAllOrders};