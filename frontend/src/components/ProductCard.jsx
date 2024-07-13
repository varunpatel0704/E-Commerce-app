import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
function ProductCard({ product }) {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="product-card flex flex-col justify-around items-center rounded-md border w-[13rem] h-[16rem] shadow hover:shadow-lg">
        <img
          className="object-contain w-24 h-24"
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
            console.log("add to cart");
          }}
        >
          Add <HiPlus />
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
