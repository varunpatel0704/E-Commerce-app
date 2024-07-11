import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.class.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

const getCategories = asyncHandler(async function (req, res, next) {
  const categories = await Category.find({}).select("-products");

  if (!categories.length) return next(new ApiError(404, "No categories found"));

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched requested categories", categories));
});

const getProducts = asyncHandler(async function (req, res, next) {
  // try to fetch categories first and then products under that category.
  const { category } = req.params || req.body;
  // utilizing this method coz the (no of categories) << (no of products) and we are already storing products category wise. Hence it makes more sense to fetch then category wise which saves time as well
  const result = await Category.find({ name: category })
    .populate("products");

  const products = result.products;

  if (!products.length) return next(new ApiError(404, "No products not found"));

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched requested products", products));
});

const getProduct = asyncHandler(async function (req, res, next) {
  const { productId } = req.params || req.body;
  const product = await Product.findById(productId);

  if (!product) return next(new ApiError(404, "Product not found"));

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched requested product", product));
});

export { getCategories, getProducts, getProduct };
