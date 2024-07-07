import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
function CartItem({ item }) {
  const [qty, setQty] = useState(String(item.quantity));  
  return (
    <div className="cart flex justify-between items-center text-base p-2 border rounded mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center p-1 gap-5 sm:gap-10 text-sm sm:text-base">
        <Link to={`/product/${item.id}`}>
          <img className="sm:w-24 w-20 object-contain" src={item.image} alt={item.name} />
        </Link>
        <article>
          <p>{item.name}</p>
          <p>${item.price}</p>
        </article>
      </div>

      <div className="flex p-2 gap-1 sm:gap-3 justify-center items-center">
        <button className="border p-1 sm:p-1.5 bg-gray-200 rounded text-xs sm:text-sm"><FaMinus/></button>
        <input
          type="text"
          min={1}
          max={10}
          value={qty}
          onChange={e=>setQty(String(e.target.value))}
          className="w-5 text-center text-sm sm:text-base"
        />
        <button className="border p-1 sm:p-1.5 bg-gray-200 rounded text-xs sm:text-sm"><FaPlus/></button>
        <button className="border p-1 sm:p-1.5 bg-gray-200 rounded text-xs sm:text-sm" >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
