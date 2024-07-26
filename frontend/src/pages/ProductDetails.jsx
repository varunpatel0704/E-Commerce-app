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

//make sure sufficient stock is present before modifying it.

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
          className="w-full object-contain scroll-hidden rounded"
          src={
            product.image
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
