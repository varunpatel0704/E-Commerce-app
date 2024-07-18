import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import Stripe from "stripe";
// import dotenv from 'dotenv'
import orderRouter from "./routes/order.routes.js";

const app = express();
// dotenv.config({
//   path: '../.env'
// })

export const stripe = new Stripe(
  process.env.STRIPE_KEY
);


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "100kb" }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use(errorHandler);

export default app;
