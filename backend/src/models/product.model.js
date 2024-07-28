import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, 'product category is required']
    },

    description: {
      type: String,
      default: "No discription provided",
      // required: [true, 'product discription is required']
    },

    image: {
      type: String,
      required: [true, "product image is required"],
    },

    stock: {
      type: Number,
      required: [true, "product stock is required"],
    },
    initialStock: {
      type: Number,
      required: [true, "product stock is required"],
    },

    price: {
      type: Number,
      required: [true, "product price is required"],
    },
    // tags: [{ type: String }], //eg: latest, trending, etc.
    discount: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
