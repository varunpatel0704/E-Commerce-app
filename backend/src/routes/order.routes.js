import {Router} from 'express'
import { createPaymentIntent, newOrder } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.route('/create-paymentIntent').post(createPaymentIntent); // create stripe payment intent.
orderRouter.route('/new').post(newOrder);

export default orderRouter;