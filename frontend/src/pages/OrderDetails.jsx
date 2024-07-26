import { Link, useParams } from "react-router-dom";
import PriceDetails from "../components/PriceDetails.jsx";
import { BiArrowBack } from "react-icons/bi";
import { useGetOrderQuery } from "../features/orders/ordersApiSlice.js";
import { CheckoutItem } from "./Checkout.jsx";

function OrderDetails() {
  const { orderId } = useParams();
  const { data: res, isLoading } = useGetOrderQuery(orderId);

  if (isLoading) return <h1>loading...</h1>;

  const {
    fullName,
    phoneNumber,
    paymentInfo,
    shippingAddress,
    orderItems,
    priceDetails,
  } = res.data;
  
  const { address, city, state, pincode } = shippingAddress;
  const addressString = `${address}, ${city}-${pincode}, ${state}`;
  console.log(res.data);

  return (
    <main className="bg-white border shadow-md rounded w-full p-4">
      <Link to="/orders">
        <BiArrowBack />
      </Link>
      <h2 className="mt-1 w-full text-xl font-bold text-black text-opacity-70 tracking-wide">
        ORDER DETAILS
      </h2>
      <div className="mt-3 flex w-full justify-between">
        {/* user info */}
        <section className="w-[40%] flex flex-col gap-6 p-5">
          {/* shipping details */}
          <div className="w-[100%]">
            <h3 className="w-full font-medium text-lg text-black text-opacity-80">
              Shipping Details
            </h3>
            <article className="flex flex-col gap-1 pt-2">
              <p className="font-medium">{fullName}</p>
              <p>{addressString}</p>
              <p>
                <span className="font-medium text-black text-opacity-75">
                  Phone number
                </span>{" "}
                {phoneNumber}
              </p>
            </article>
          </div>

          {/* payment details */}
          <div className="w-[100%]">
            <h3 className="w-full font-medium text-lg text-black text-opacity-80">
              Payment Details
            </h3>
            <article className="flex flex-col gap-0.5 pt-2">
              <p className="flex justify-between">
                <span>Payment Method</span> {paymentInfo.method}
              </p>
              <p className="flex justify-between items-end">
                <span>Transaction id</span>{" "}
                <span className="text-xs">{paymentInfo.trxnId}</span>
              </p>
            </article>
          </div>

          {/* price details */}
          <div className="w-[100%]">
            <h3 className="w-full font-medium text-lg text-black text-opacity-80">
              Price Details
            </h3>
            <article className="pt-2 flex flex-col gap-0.5">
              <PriceDetails
                subTotal={priceDetails.subTotal}
                tax={priceDetails.tax}
                shippingCharges={priceDetails.shippingCharges}
                discount={priceDetails.discount}
                total={priceDetails.total}
              />
            </article>
          </div>
        </section>

        {/* order items */}
        <section className=" w-[52.5%] flex flex-col justify-between p-5">
          <div className="">
            <h3 className="w-full font-medium text-xl text-black text-opacity-80">
              Order Items
            </h3>
            <ul className="rounded-bl-md rounded-br-md last:border-b-0 mt-4 w-[80%] scroll-hidden">
            {orderItems.map((item) => (
              <CheckoutItem key={item._id} item={item} url={`/`} />
            ))}
          </ul>
          </div>

          {/* <p>
            <span
              style={{
                color:
                  (status === "Processing" && "rgb(255, 44, 44)") ||
                  (status === "Shipped" && "#16a34a") ||
                  (status === "Delivered" && "#6b7280"),
              }}
            >
              {status}
            </span>{" "} */}
          {/*implement optimistic update */}
          {/* </p> */}
          {/* <button
            disabled={status === "Delivered"}
            className="order-mgmnt-button"
            onClick={() =>
              setStatus((prev) =>
                prev === "Processing" ? "Shipped" : "Delivered"
              )
            }
          >
            Process
          </button> */}
        </section>
      </div>
    </main>
  );
}

export default OrderDetails;
