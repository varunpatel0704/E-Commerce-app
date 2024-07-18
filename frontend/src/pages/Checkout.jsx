import { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { FaRegCreditCard } from "react-icons/fa6";
import { IoCashOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import PriceDetails from "../components/PriceDetails.jsx";
import { ShippingInfo, InputField } from "./Profile.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../features/users/usersApiSlice.js";
import { useCreatePaymentIntentMutation } from "../features/orders/ordersApiSlice.js";

import toast from "react-hot-toast";

function Checkout() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.id);
  const { data, isLoading } = useGetUserQuery(email);
  const [updateUser, update] = useUpdateUserMutation();
  const [createPaymentIntent, paymentIntent] = useCreatePaymentIntentMutation();

  const { cartItems, subTotal, tax, shippingCharges, discount, total } =
    useSelector((state) => state.cart);

  const [shippingInfo, setShippingInfo] = useState({
    address: data?.data.shippingAddress?.address,
    city: data?.data.shippingAddress?.city,
    state: data?.data.shippingAddress?.state,
    pincode: data?.data.shippingAddress?.pincode,
  });

  const [formData, setFormData] = useState({
    fullName: data?.data.fullName,
    email: data?.data.email,
    phoneNumber: data?.data.phoneNumber,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const user = data.data;
      const shippingAddress = user.shippingAddress;

      setFormData({
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });

      setShippingInfo({
        address: shippingAddress?.address,
        city: shippingAddress?.city,
        state: shippingAddress?.state,
        pincode: shippingAddress?.pincode,
      });
    }
  }, [data]); // useEffect is used to synchronized the above state variables with the incoming user data.

  if (!cartItems.length) return <h1>Your cart is empty</h1>;

  if (isLoading || update.isLoading || paymentIntent.isLoading) return <h1>Loading...</h1>;

  function handleInputChange(e) {
    const { name: property, value } = e.target;
    setFormData({ ...formData, [property]: value });
  }

  async function handleInputSave({ name: property, value, title }) {
    const user = data.data;
    if (!value) {
      setFormData({ ...formData, [property]: user?.[`${property}`] });
      toast.error(`Please provide ${title}`);
      return;
    }

    try {
      const details = new FormData();
      details.set(`${property}`, value);
      const res = await updateUser({ details, email }).unwrap();
      if (res.data) {
        toast.success(`${title} updated`);
        setFormData({ ...formData, [property]: res.data[`${property}`] });
      }
    } catch (error) {
      if (error.status === 409) toast.error(`This email is already under use`);
      else toast.error(`Failed to update ${title} `);

      setFormData({ ...formData, [property]: user?.[`${property}`] });
    }
  }

  function handleShippingInfoChange(e) {
    const { name: property, value } = e.target;
    setShippingInfo({ ...shippingInfo, [property]: value });
  }

  async function handleShippingInfoSave() {
    const shippingAddress = data?.data.shippingAddress;
    for (const field in shippingInfo) {
      if (!shippingInfo[field]) {
        setShippingInfo({
          address: shippingAddress?.address,
          city: shippingAddress?.city,
          state: shippingAddress?.state,
          pincode: shippingAddress?.pincode,
        });

        toast.error("Please provide all address fields");
        return;
      }
    }

    try {
      const res = await updateUser({
        email,
        details: { shippingAddress: shippingInfo },
      }).unwrap();

      if (res.data) {
        toast.success("Shipping address updated");
        setShippingInfo(res.data.shippingAddress);
      }
    } catch (error) {
      toast.error("Failed to update shipping address");

      setShippingInfo({
        address: shippingAddress?.address,
        city: shippingAddress?.city,
        state: shippingAddress?.state,
        pincode: shippingAddress?.pincode,
      });
    }
  }

  async function handlePlaceOrder(){
    try {
      console.log('sending request for payment intent', total);
      const res = await createPaymentIntent({amount: total}).unwrap();
      if(res.data){
        const orderDetails = {
          shippingAddress: shippingInfo,
          userId: email,
          orderItems: cartItems.map(({product, qty})=>({productId: product._id, qty})),
          priceDetails: {subTotal, tax, shippingCharges, discount, total}
        }
        navigate('/checkout/payment', {state: {client_secret: res.data.client_secret, orderDetails}});
      }
    } catch (error) {
      console.log('error creating payment intent', error);
    }
  }


  return (
    <div className="flex sm:flex-row flex-col-reverse w-full gap-3 min-h-[95vh]">
      <div className="p-6 border sm:w-[60%] w-full rounded-md shadow-md">
        <Link to="/cart">
          <BiArrowBack />
        </Link>

        <form className="mt-1.5 flex flex-col sm:w-[85%] shipping-info-form">
          <section className="flex flex-col gap-3">
            <h2 className="text-2xl sm:text-2xl mb-3 w-full font-medium text-black text-opacity-70">
              Shipping Details
            </h2>
            <InputField
              title="Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              onSave={handleInputSave}
              placeholder="Full Name"
            />

            <ShippingInfo
              className=""
              shippingAddress={shippingInfo}
              onChange={handleShippingInfoChange}
              onSave={handleShippingInfoSave}
            />
            <InputField
              title="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onSave={handleInputSave}
              placeholder="Email"
            />
            <InputField
              className=""
              title="Phone Number"
              type="tel"
              name="phoneNumber"
              pattern="[1-9]{1}[0-9]{9}"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              onSave={handleInputSave}
              placeholder="Phone Number"
            />
          </section>
        </form>

        <section className="flex flex-col justify-start gap-4 mt-8">
          <h2 className="text-2xl sm:text-2xl mb-3 w-full font-medium text-black text-opacity-70">
            Payment Options
            {/* PAYMENT OPTIONS */}
          </h2>

          {/* <p className="flex gap-4 justify-start items-center text-lg ">
            <input type="radio" name="payment" id="upi" />

            <label htmlFor="upi" className="flex gap-1.5 items-center">
              <img
                className="h-5 w-5"
                src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif"
                alt=""
              />
              UPI{" "}
            </label>
          </p> */}

          <p className="flex gap-4 justify-start items-center text-lg">
            <input type="radio" name="payment" id="card" />
            <label
              htmlFor="card"
              className="flex gap-2 items-center justify-between"
            >
              <FaRegCreditCard /> Credit / Debit Card
            </label>
          </p>

          <p className="flex gap-4 justify-start items-center text-lg">
            <input type="radio" name="payment" id="cash" />
            <label
              htmlFor="cash"
              className="flex gap-2 items-center justify-between"
            >
              <IoCashOutline />
              Cash on Delivery
            </label>
          </p>

          <button
            className="self-start border public-site-btn py-3 px-8 rounded-lg font-medium text-lg mt-4"
            onClick={handlePlaceOrder}
          >
            {/* <Link to='/checkout/payment'> */}
            Place Order
            {/* </Link> */}
          </button>
        </section>
      </div>

      <aside className="sm:w-[40%] rounded">
        <div className="border shadow-md rounded-md p-6">
          <h2 className="text-2xl sm:text-3xl rounded-tl-md rounded-tr-md">
            Order Summary
          </h2>
          <ul className="rounded-bl-md rounded-br-md last:border-b-0 mt-4">
            {cartItems.map((item) => (
              <CheckoutItem key={item.product._id} item={item} url={`/`} />
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2.5 p-7 border mt-5 rounded-md shadow-md">
          <h2 className="text-xl sm:text-2xl mb-2 font-medium text-black text-opacity-80">
            Price Details
          </h2>
          <PriceDetails
            subTotal={subTotal}
            tax={tax}
            shippingCharges={shippingCharges}
            discount={discount}
            total={total}
          />
        </div>
      </aside>
    </div>
  );
}

export function CheckoutItem({ item: { product, qty } }) {
  const { name, price, _id, image } = product;
  return (
    <li className="flex justify-center items-end gap-3 py-4 border-b last-of-type:border-b-0 last-of-type:pb-0 text-sm">
      <Link to={`/products/${_id}`}>
        <img src={image} alt="" className="object-contain rounded w-12 h-12" />
      </Link>
      <article>
        <p className="text-base">{name}</p>
        <span className="">Qty: {qty}</span>
      </article>
      <span className="ml-auto self-end">${qty * Number(price)}</span>
    </li>
  );
}

export default Checkout;
