import { Router } from "express";

const productRouter = Router();

productRouter.route('/latest').get(); // latest products
productRouter.route('/categories').get(); // all categories
productRouter.route('/categories/:id').get(); // list of products from specific category
productRouter.route('/:id').get();  // specific product details

export default productRouter;