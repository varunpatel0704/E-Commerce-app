import {Router} from 'express'
import { createPaymentIntent, newOrder, getOrder, getOrders, getAllOrders } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.route('/create-paymentIntent').post(createPaymentIntent); // create stripe payment intent.
orderRouter.route('/new').post(newOrder);
orderRouter.route('/all').get(getAllOrders); // every order placed so far.
orderRouter.route('/all/:userId').get(getOrders); // orders placed by a specific user.
orderRouter.route('/:orderId').get(getOrder); // specific order by a specific user.

export default orderRouter;