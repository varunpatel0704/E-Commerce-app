import { Router } from "express";
import {
  createPaymentIntent,
  newOrder,
  getOrder,
  getOrders,
  getAllOrders,
  processOrder,
} from "../controllers/order.controller.js";
import {
  requireAdmin,
  requireAuth,
} from "../middlewares/requireAuth.middleware.js";

const orderRouter = Router();

orderRouter.route("/create-paymentIntent").post(createPaymentIntent); // create stripe payment intent.
orderRouter.route("/new").post(newOrder);
orderRouter.route("/all").get(requireAuth, requireAdmin, getAllOrders); // every order placed so far.
orderRouter.route("/all/:userId").get(requireAuth, getOrders); // orders placed by a specific user.
orderRouter
  .route("/:orderId")
  .get(requireAuth, getOrder)
  .patch(requireAuth, requireAdmin, processOrder); // specific order by a specific user.

export default orderRouter;
