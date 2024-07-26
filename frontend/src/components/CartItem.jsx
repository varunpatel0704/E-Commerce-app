import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../features/cart/cartSlice.js";

function CartItem({ item: { product, qty } }) {
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();

  function handleIncrement(){
    if(quantity+1 < product.stock){
      if(quantity < 10){
        setQuantity(q=>q+1);
        dispatch(addToCart(product, quantity));
      }
      else  
        toast.error('Quantity limit reached');
    }
    else
      toast.error('Not enough stock');
  }
  function handleDecrement(){
    if(quantity > 1){
      setQuantity(q=>q-1);
      dispatch(addToCart(product, quantity));
    }
  }
  function handleRemoveFromCart(){
    dispatch(removeFromCart(product))
  }

  return (
    <div className="cart flex justify-between items-center text-base p-2 border rounded mb-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center p-1 gap-5 sm:gap-10 text-sm sm:text-base">
        <Link to={`/products/${product._id}`}>
          <img
            className="sm:w-24 w-20 object-contain rounded"
            src={product.image}
            alt={product.name}
          />
        </Link>
        <article>
          <p>{product.name}</p>
          <p>${product.price}</p>
        </article>
      </div>

      <div className="flex gap-1 sm:gap-3 items-center">
        <button
          className="border p-1 sm:p-1.5 bg-gray-200 rounded text-xs sm:text-sm"
          onClick={handleDecrement}
        >
          <FaMinus />
        </button>
        <span className="text-lg">{quantity}</span>
        <button
          className="border p-1 sm:p-1.5 bg-gray-200 rounded text-xs sm:text-sm"
          onClick={handleIncrement}
        >
          <FaPlus />
        </button>
        <button className="border p-1 sm:p-1.5 bg-gray-200 rounded text-xs sm:text-sm" onClick={handleRemoveFromCart} >
          <FaTrash />
        </button>
      </div>
      
    </div>
  );
}

export default CartItem;
