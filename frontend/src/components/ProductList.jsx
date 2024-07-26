import ProductCard from "./ProductCard.jsx";
import { useGetProductsQuery } from "../features/products/productsApiSlice.js";
import { useState } from "react";

function ProductList({ category, sortBy, price=100000 }) {
  // Todo: fetch a list of products
  const { data, isLoading, isFetching, isError, error } =
    useGetProductsQuery(category);
  const [page, setPage] = useState(1);
  const pageSize = 12;
  let products = [];
  let pageCount = 1;
  let begin = 1;
  let end = 1;

  function sortProducts(sortBy) {
    switch (sortBy) {
      case "price-asc":
        products.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        products.sort((a, b) => b.price - a.price);
        break;

      case "newest":
        products.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA > dateB ? -1 : 1;
        });
        break;

      default:
        break;
    }
  }

  function filterProductsByPrice(price){
    products = products.filter(p=>p.price<=price);
  }

  if (data) {
    products = Array.from(data.data);
    sortProducts(sortBy);
    filterProductsByPrice(price);

    pageCount = Math.ceil(products.length / pageSize);

    begin = 0 + (page - 1) * pageSize;
    end = pageSize + (page - 1) * pageSize;

    products = products.slice(begin, end);
  }

  function nextPage() {
    setPage((p) => p + 1);
  }
  function prevPage() {
    setPage((p) => p - 1);
  }

  const productList = products.map((product) => (
    <ProductCard key={product._id} product={product} />
  ));

  if (isLoading) return <h1>Loading...</h1>;

  return isError ? (
    error.data.message
  ) : (
    <div>
      <div className="flex flex-wrap gap-5">{productList}</div>

      <article className="flex justify-center items-center mt-8 text-sm w-full">
        <button
          disabled={page === 1}
          onClick={prevPage}
          className="mx-2 border text-sm  py-1 px-2.5 rounded-lg shadow product-search-pagination-btn"
        >
          Prev
        </button>
        <span>
          {page} of {pageCount}
        </span>
        <button
          disabled={page === pageCount}
          onClick={nextPage}
          className="mx-2 border py-1 px-2.5 rounded-lg shadow product-search-pagination-btn"
        >
          Next
        </button>
      </article>
    </div>
  );
}

export default ProductList;
