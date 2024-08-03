import { Router } from "express";
import { requireAdmin, requireAuth } from "../middlewares/requireAuth.middleware.js";
import { addCoupon, getCoupon } from "../controllers/coupon.controller.js";

const couponRouter = Router();
couponRouter.route('/new').post(requireAuth, requireAdmin, addCoupon);
couponRouter.route('/:couponCode').get(getCoupon);
// couponRouter.route('/all').get(getCoupon);



export default couponRouter;