import { Router } from "express";
import {
  getCategories,
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controllers.js";

const productRouter = Router();

productRouter.route("/categories").get(getCategories); // all categories
productRouter.route("/categories/:category").get(getProducts); // list of products from specific category
productRouter.route('/new').post(addProduct);
productRouter
  .route("/:productId")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct); // specific product

export default productRouter;
