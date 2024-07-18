import { useState } from "react";
import { VscError } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import PriceDetails from "../components/PriceDetails.jsx";


function Cart() {
  const [couponCode, setCouponCode] = useState("");
  const [isCouponValid, setIsCouponValid] = useState(true);

  const cart = useSelector(state=>state.cart);
  const cartItems = cart.cartItems;
  //calculate cart value when rendering.

  if(!cartItems.length)return <h1>Your Cart Is Empty</h1>
  else
  return (
    <div className="flex sm:flex-row sm:justify-around flex-col text-sm sm:text-base gap-3 w-full">
      <main className="flex flex-col w-full sm:w-[60%] sm:mt-3 rounded-md">
        {cartItems.map((item) => (
          <CartItem key={item.product._id} item={item} />
        ))}
      </main>
      <main className="w-full sm:w-[35%] ">
        <aside className="flex flex-col gap-2.5 p-7 border rounded-md sm:sticky sm:right-0 sm:top-[89px] shadow-md ">
          <h2 className="text-xl sm:text-2xl mb-2 font-medium text-black text-opacity-80">Price Details</h2>
          <PriceDetails
            subTotal={cart.subTotal}
            tax={cart.tax}
            shippingCharges={cart.shippingCharges}
            discount={cart.discount}
            total={cart.total}
          />

          <input
            className="text-sm mt-2 w-9/12 input-base-style"
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            autoComplete="off"
            placeholder="Enter Coupon Code"
          />
          {couponCode &&
            (isCouponValid ? (
              <p className="text-green-600">
                ${discount} off using "<code>{couponCode}</code>"
              </p>
            ) : (
              <div className="flex items-center text-red-400">
                <p className="pb-0.5 mr-0.5">Invalid Coupon</p>
                <VscError />
              </div>
            ))}
          {cartItems.length > 0 && (
            <button className="border rounded-md py-2 public-site-btn mt-5">
              <Link to="/checkout">Checkout</Link>
            </button>
          )}
        </aside>
      </main>
    </div>
  );
}

export default Cart;
