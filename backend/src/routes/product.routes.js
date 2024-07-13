import { Router } from "express";
import {
  getCategories,
  getAllProducts,
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controllers.js";
import { requireAuth, requireAdmin } from "../middlewares/requireAuth.middleware.js";
import { multiUpload } from "../middlewares/fileUpload.middleware.js";
import cloudUpload from "../middlewares/cloudUpload.middleware.js";

const productRouter = Router();

productRouter.route("/categories").get(getCategories); // all categories
productRouter.route("/categories/:category").get(getProducts); // list of products from specific category
productRouter.route("/new").post(requireAuth, requireAdmin, multiUpload('image'), cloudUpload, addProduct);
productRouter.route("/all").get(getAllProducts);

productRouter
  .route("/:productId")
  .get(getProduct)
  .patch(requireAuth, requireAdmin, multiUpload('image'), cloudUpload, updateProduct)
  .delete(requireAuth, requireAdmin, deleteProduct); // specific product

export default productRouter;
