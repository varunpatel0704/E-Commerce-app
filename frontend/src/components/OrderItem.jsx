import React from "react";
import { Link } from "react-router-dom";

function OrderStatus({ children, discription }) {
  return (
    <article className="w-3/12 mt-3">
      <p className="text-sm flex items-center gap-1 font-medium">{children}</p>
      <p className="text-sm text-slate-600 mt-0.5">{discription}</p>
    </article>
  );
}

function OrderItem({ order }) {
  const { id, item, deliveryDate, amount, image, status } = order;

  let content;
  if (status.current.toLowerCase() === "delivered") {
    content = (
      <OrderStatus discription={status.discription}>
        <span className="w-3 h-3 rounded-full bg-green-600 opacity-90"></span>
        Delivered on {deliveryDate}
      </OrderStatus>
    );
  } else if (status.current.toLowerCase() === "canceled") {
    content = (
      <OrderStatus discription={status.discription}>
        <span className="w-3 h-3 rounded-full bg-red-600 opacity-90"></span>{" "}
        Canceled
      </OrderStatus>
    );
  } else if (status.current.toLowerCase() === "returned") {
    content = (
      <OrderStatus discription={status.discription}>
        <span className="w-3 h-3 rounded-full bg-gray-400 opacity-90"></span>{" "}
        Returned
      </OrderStatus>
    );
  } else {
    content = (
      <OrderStatus discription={status.discription}>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Arriving on{" "}
        {deliveryDate}
      </OrderStatus>
    );
  }

  return (
    <Link key={id} to={`/orders/${id}`}>
      <div className="flex items-start border w-full p-2 rounded gap-8 shadow-sm hover:shadow-md transition-shadow">
        <article className="flex justify-start gap-4 items-start w-5/12">
          <img
            src={image}
            alt={item}
            className="h-[4.5rem] object-contain ml-8"
          />
          <p className=" mt-3">{item}</p>
        </article>

        <article className="mt-3 w-2/12">${amount}</article>

        {content}
      </div>
    </Link>
  );
}

export default OrderItem;
