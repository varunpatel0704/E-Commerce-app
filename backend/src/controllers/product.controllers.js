import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.class.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import Product from "../models/product.model.js";

const getTaggedProducts = asyncHandler(async function(req, res, next){

});

const getCategories = asyncHandler(async function(req, res, next){

});

const getProducts = asyncHandler(async function(req, res, next){

});

const getProduct = asyncHandler(async function(req, res, next){
  const {productId} = req.params;
  const product = await Product.findById(productId);

  if(!product) return next(new ApiError(404, 'Product not found'));
  
})

export {getLatestProducts, getCategories, getProducts};