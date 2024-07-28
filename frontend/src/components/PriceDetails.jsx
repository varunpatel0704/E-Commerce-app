import React from "react";

function PriceDetails({subTotal, total, tax, shippingCharges, discount}) {
  return (
    <>
      <p className="flex justify-between">
        <span className="font-medium text-black text-opacity-75">SubTotal</span>₹{subTotal}
      </p>
      <p className="flex justify-between">
        <span className="font-medium text-black text-opacity-75">Tax</span> ₹{tax}
      </p>
      <p className="flex justify-between">
        <span className="font-medium text-black text-opacity-75">Shipping Charges</span> ₹{shippingCharges}
      </p>
      <p className="flex justify-between">
        <span className="font-medium text-black text-opacity-75">Discount</span> <em className="text-green-600">-₹{discount}</em>{" "}
      </p>
      <hr className="border my-3" />
      <p className="flex justify-between font-medium text-black text-opacity-80">
        <span className="">Total Amount</span> ₹{total}
      </p>
      
    </>
  );
}

export default PriceDetails;
