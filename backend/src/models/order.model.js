import mongoose from "mongoose";
import { addressSchema } from "./user.model.js";

const priceSchema = new mongoose.Schema({
  subTotal: Number,
  tax: Number,
  discount: Number,
  shippingCharges: Number,
  total: Number,
});

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "productId is required to place order"],
  }, 
  status: {
    currentStatus: {
      type: String,
      enum: ["Processing", "Confirmed", "Delivered", "Returned"],
      default: "Processing",
    },
    description: String,
  },
  qty: Number
})

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required to place order"],
    },

    orderItems: [orderItemSchema],

    orderDate: {
      type: Date,
      required: true,
    },

    paymentInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },

    priceDetails: {
      type: priceSchema,
      required: true,
    },

    shippingAddress: {
      type: addressSchema,
      required: [true, "shipping details are required to place order"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
