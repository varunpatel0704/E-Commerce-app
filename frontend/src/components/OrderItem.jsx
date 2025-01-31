import React from "react";
import { Link } from "react-router-dom";

function OrderStatus({ children, description }) {
  return (
    <article className="w-3/12 mt-3">
      <p className="text-sm flex items-center gap-1 font-medium">{children}</p>
      <p className="text-sm text-slate-600 mt-0.5">{description}</p>
    </article>
  );
}

function OrderItem({ order:{ order, _id} }) {
  const { name, deliveryDate, price, image, status } = order;
  const deliveredOn = deliveryDate? new Date(deliveryDate): undefined;
  let content;
  if (status.currentStatus.toLowerCase() === "delivered") {
    content = (
      <OrderStatus description={status.description}>
        <span className="w-3 h-3 rounded-full bg-green-600 opacity-90"></span>
        Delivered on {deliveredOn?.toDateString()}
      </OrderStatus>
    );
  } else if (status.currentStatus.toLowerCase() === "returned") {
    content = (
      <OrderStatus description={status.description}>
        <span className="w-3 h-3 rounded-full bg-red-600 opacity-90"></span>{" "}
        Returned
      </OrderStatus>
    );
  } 
   else {
    content = (
      <OrderStatus description={status.description}>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Arriving on{" "}
        {deliveredOn?.toDateString()}
      </OrderStatus>
    );
  }

  return (
    <Link to={`/orders/${_id}`}>
      <div className="flex items-start border w-full py-4 px-2 rounded gap-8 shadow-sm hover:shadow-md transition-shadow">
        <article className="flex justify-start gap-4 items-start w-5/12">
          <img
            src={image}
            alt={name}
            className="h-[5rem] rounded object-contain ml-8"
          />
          <p className=" mt-3">{name}</p>
        </article>

        <article className="mt-3 w-2/12">₹{price}</article>

        {content}
      </div>
    </Link>
  );
}

export default OrderItem;
