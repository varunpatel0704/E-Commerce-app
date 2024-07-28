import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.class.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import Product from "../models/product.model.js";
import Category from "../models/category.model.js";
import { cloudinaryDelete } from "../middlewares/cloudUpload.middleware.js";

const getCategories = asyncHandler(async function (req, res, next) {
  const categories = await Category.find({}).select("-products");

  if (!categories.length) return next(new ApiError(404, "No categories found"));

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched requested categories", categories));
});

const getAllProducts = asyncHandler(async function (req, res, next) {
  const allProducts = await Product.find({});
  if (!allProducts.length) return next(new ApiError(404, "No products found"));

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched all products", allProducts));
});

const getProducts = asyncHandler(async function (req, res, next) {
  // try to fetch categories first and then products under that category.
  let { category } = req.params || req.body;
  category = category.toLowerCase();

  // utilizing this method coz the (no of categories) << (no of products) and we are already storing products category wise. Hence it makes more sense to fetch then category wise which saves time as well
  const result = await Category.findOne({ category }).populate("products");
  if (!result) return next(new ApiError(404, "category not found"));
  const products = result.products;

  if (!products.length) {
    if (result.image) {
      const imageUrl = result.image;
      const fileName = imageUrl.split("/").pop();
      const publicId = fileName.slice(0, fileName.indexOf("."));
      cloudinaryDelete([publicId]);
    }

    await result.deleteOne();
    return next(new ApiError(404, "No products not found, category removed"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched requested products", products));
});

const getProduct = asyncHandler(async function (req, res, next) {
  const { productId } = req.params || req.body;
  const product = await Product.findById(productId).populate(
    "category",
    "category"
  );

  if (!product) return next(new ApiError(404, "Product not found"));

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched requested product", product));
});

const addProduct = asyncHandler(async function (req, res, next) {
  // get the details from req.body.
  let { name, category, description, price, discount, stock, image } = req.body;
  category = category.toLowerCase();

  const existingProduct = await Product.findOne({
    $or: [{ name }, { description }],
  }).populate("category");

  if (existingProduct && existingProduct.category.category === category) {
    return next(new ApiError(409, "Product already exists"));
  }

  const newProduct = new Product({
    name,
    description,
    stock,
    initialStock: stock,
    price,
    discount,
    image,
  });

  const existingCategory = await Category.findOne({ category });

  if (existingCategory) {
    existingCategory.products.push(newProduct._id);
    newProduct.category = existingCategory._id;
    await existingCategory.save();
  } else {
    const newCategory = new Category({
      category,
      image,
      products: [newProduct._id],
    });
    await newCategory.save();
    newProduct.category = newCategory._id;
  }

  // await Promise.all(categories.map(async (category)=>{
  //   const existingCategory = await Category.findOne({category});

  //   if(existingCategory){
  //     existingCategory.products.push(newProduct._id);
  //     return category;
  //   }

  //   else{
  //     const newCategory = new Category({
  //       category,
  //       products: [newProduct._id],
  //     })
  //     await newCategory.save();
  //     return category;
  //   }
  // }))

  await newProduct.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Product added", newProduct));
});

const updateProduct = asyncHandler(async function (req, res, next) {
  const { productId } = req.params;
  const product = req.body;
  product.category = product.category.toLowerCase();
  console.log("received product ", product);

  if (!product.category) product.category = "miscellaneous";

  const oldProduct = await Product.findById(productId);
  if (!oldProduct) return next(new ApiError(404, "Product not found"));
  console.log("old product ", oldProduct);

  if (!product.image || product.image === "undefined") {
    product.image = oldProduct.image;
  }

  // todo: find category by name instead of id since this is creating duplicate docs.
  const oldCategory = await Category.findById(oldProduct.category);

  let newCategory = product.category;
  console.log("oldCategory: ", oldCategory);

  // comparing cateogry names
  if (oldCategory.category !== newCategory) {
    // de-list the product from previous category since a new category has been created
    oldCategory.products = oldCategory.products.filter(
      (product) => product.toString() !== productId
    );

    if (!oldCategory.products.length) {
      // delete the old category if empty
      const imageUrl = oldCategory.image;
      const fileName = imageUrl.split("/").pop();
      const publicId = fileName.slice(0, fileName.indexOf("."));
      cloudinaryDelete([publicId]);
      console.log('old category empty now, deleting...');
      await oldCategory.deleteOne();
    }
    else{
      await oldCategory.save();
      console.log("oldcategory after save: ", oldCategory);
    }

    // now check if the new category already exists in db.
    newCategory = await Category.findOne({ category: newCategory });
    if (newCategory) {
      // since it already exists in the db, we simply need to add the updated product's id to its products array.
      newCategory.products.push(productId);
    } // if not, create a new one
    else {
      newCategory = new Category({
        category: product.category,
        image: product.image,
        products: [productId],
      });
    }
    // console.log('new cateogry: ', newCategory);
    await newCategory.save();
    product.category = newCategory._id;
  } else {
    product.category = oldCategory._id;
  }

  oldProduct.overwrite(product);
  oldProduct.initialStock = product.stock;//we won't receive this field from frontend so need to set it manully.
  const updatedProduct = await oldProduct.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated", updatedProduct));
});

const deleteProduct = asyncHandler(async function (req, res, next) {
  const { productId } = req.params || req.body;

  const product = await Product.findById(productId);
  if (!product) return next(new ApiError(404, "product not found"));

  if (product.image) {
    const imageUrl = product.image;
    const fileName = imageUrl.split("/").pop();
    const publicId = fileName.slice(0, fileName.indexOf("."));
    cloudinaryDelete([publicId]);
  } //delete uploaded image from cloudinary

  // first de-list the product from respective category.
  const productCategory = await Category.findById(product.category);

  // for (const i in productCategory.products) {
  //   const pId = productCategory.products[i]?.toString();
  //   if (pId === productId) productCategory.products[i] = null;
  // }
  productCategory.products = productCategory.products.filter(
    (product) => product.toString() !== productId
  );
  if (!productCategory.products.length) {
    const imageUrl = productCategory.image;
    const fileName = imageUrl.split("/").pop();
    const publicId = fileName.slice(0, fileName.indexOf("."));
    cloudinaryDelete([publicId]);
    productCategory.deleteOne(); //no need to await
  }

  await product.deleteOne();
  return res.status(200).json(new ApiResponse(200, "Product deleted"));
});

export {
  getCategories,
  getAllProducts,
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
