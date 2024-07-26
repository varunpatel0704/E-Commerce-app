import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {addToCart, calculateCartValue} from '../features/cart/cartSlice.js';
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  function handleAddToCart(){
    dispatch(addToCart(product, 1));
    dispatch(calculateCartValue());
    toast.success('Added to cart');
  }


  return (
    <Link to={`/products/${product._id}`}>
      <div className="product-card flex flex-col justify-evenly items-center rounded-md border w-[13rem] h-[16rem] shadow hover:shadow-lg outline-none">
        <img
          className="object-contain w-24 h-24 rounded"
          src={product.image}
          alt={product.name}
        />
        <h3 className="">
          {product.name.length < 20
            ? product.name
            : product.name.slice(20) + "..."}
        </h3>
        <p className="text-">${product.price}</p>

        <button
          className="rounded-full public-site-btn text-white p-2 mb-1.5 flex items-center justify-center gap-1.5 w-20"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault(); // to prevent link from activating
            handleAddToCart();
          }}
        >
          Add <HiPlus />
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
