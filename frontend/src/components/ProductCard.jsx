import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToCart, calculateCartValue } from "../features/cart/cartSlice.js";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  function handleAddToCart() {
    dispatch(addToCart(product, 1));
    dispatch(calculateCartValue());
    toast.success("Added to cart");
  }
  const discount = product.discount;
  const discountedPrice = Math.round(
    product.price - (product.price / 100) * discount
  );

  return (
    <Link to={`/products/${product._id}`}>
      <div className="product-card flex flex-col justify-evenly items-center rounded-md border w-[13rem] h-[18rem] shadow hover:shadow-lg outline-none">
        <img
          className="object-contain w-24 h-24 rounded"
          src={product.image}
          alt={product.name}
        />
        <h3 className="px-4">
          {product.name.length < 20
            ? product.name
            : product.name.slice(0, 42) + "..."}
        </h3>
        <p className="">
          <span className="text-sm text-red-700 text-opacity-80">
            -{discount}%
          </span>{" "}
          <span>₹{discountedPrice}</span>
        </p>

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
