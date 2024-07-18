import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { MdShoppingCart } from "react-icons/md";
import { BsLightningFill } from "react-icons/bs";
import { addToCart, calculateCartValue } from "../features/cart/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductQuery } from "../features/products/productsApiSlice.js";
import {toast} from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetProductQuery(id);
  const product = data?.data;

  function handleAddToCart() {
    dispatch(addToCart(product, qty));
    dispatch(calculateCartValue());
    toast.success('Added to cart');
  }

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  const discountedPrice = Math.round(
    product.price - (product.price / 100) * product.discount);
  return (
    <main className="bg-white p-6 w-full flex justify-center gap-8">
      <div className="w-[30%]">
        <img
          className="w-full object-cover scroll-hidden rounded"
          src={
            product.image ||
            "data:image/jpeg;base64,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"
          }
          alt="product image"
        />
        <section className="flex justify-between items-center gap-5 mt-6 font-medium">
          <button
            className="flex items-center justify-center gap-2 border py-4 px-8 rounded-md shadow bg-amber-500 text-white active:opacity-90"
            onClick={handleAddToCart}
          >
            <MdShoppingCart /> Add to Cart
          </button>
          <button className="flex items-center justify-center gap-2 border py-4 px-8 rounded-md shadow bg-blue-500 text-white active:opacity-90">
            <BsLightningFill /> Buy Now
          </button>
        </section>
      </div>
      <div className="w-[50%] flex flex-col gap-2">
        <section>
          <h2 className="font-medium text-black text-opacity-80 text-2xl">
            {product.name || "EVOFOX Elite X Wired Gamepad (Black, For PC)"}
          </h2>
          <h4 className="text-xs text-gray-400">Product #{id}</h4>
        </section>

        <section className="w-[40%]">
          <p className="text-green-800 text-opacity-80 font-medium col-span-3">
            Special price
          </p>
          <p>
            <span className="text-red-700 text-opacity-80 font-medium -translate-x-8">
              -{product.discount}% 
            </span> 
            <span className="text-3xl font-semibold text-gray-700">
              {' '}${discountedPrice}
            </span>{" "}
          </p>
          <p className="text-gray-500">
            List Price: <span className="line-through font-semibold">${product.price}</span>
          </p>
        </section>

        <section className="flex flex-col gap-1 mt-2">
          {product.stock > 0 ? (
            <p className="text-green-700 text-opacity-80 font-medium">
              In Stock
            </p>
          ) : (
            <p className="text-red-700 text-opacity-80 font-medium">
              Out of Stock
            </p>
          )}
          <div className="flex gap-1 sm:gap-3 items-center">
            <button
              className="border p-1 sm:p-1.5 bg-gray-200 rounded text-xs sm:text-sm"
              onClick={() => setQty((q) => (q > 1 ? q - 1 : q))}
            >
              <FaMinus />
            </button>
            <span className="text-lg">{qty}</span>
            <button
              className="border p-1 sm:p-1.5 bg-gray-200 rounded text-xs sm:text-sm"
              onClick={() => setQty((q) => (q < 10 ? q + 1 : q))}
            >
              <FaPlus />
            </button>
          </div>
        </section>

        <section className="mt-2">
          <h2 className="text-[1.1rem] font-medium text-gray-500">
            Coupons for you
          </h2>
          <ul>
            <li className="flex items-center gap-2">
              <span className="text-green-700 text-opacity-80">
                <BiSolidCoupon />
              </span>
              <code>Welcome100</code>
            </li>
          </ul>
        </section>

        <section className="mt-2">
          <h2 className="text-[1.1rem] font-medium text-gray-500">
            Description
          </h2>
          <p className="text-black text-opacity-80 text-sm w-[80%]">
            {product.description ||
              `Wired connectivity: A clutter-free gaming experience with wired
            connectivity. Elite X PC gamepad works range of up to 30 feet, so
            just lay back on your couch or bed without worrying about cables.
            With Macro Functions, Customize your Moves with EZ On the Fly Macro
            . With the ability to program complex sequences of commands, you can
            perform complex moves with a single click. Enjoy long gaming
            sessions with a shape that fits naturally in your hands.`}
          </p>
        </section>
      </div>
    </main>
  );
}

export default ProductDetails;
