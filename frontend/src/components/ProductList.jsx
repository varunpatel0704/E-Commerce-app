import ProductCard from "./ProductCard.jsx";
import { useGetProductsQuery } from "../features/products/productsApiSlice.js";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar.jsx";
import { compareTwoStrings } from "string-similarity";

function ProductList({searchParams, setSearchParams, setMaxPrice }) {
  // Todo: fetch a list of products
  const price = searchParams?.get("price");
  const category = searchParams?.get('category');
  const sortOption = searchParams?.get('sortOption');

  const { data, isLoading, isFetching, isError, error } =
    useGetProductsQuery(category);

  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState(data?.data || []);
  const pageSize = 12;
  let products = allProducts || [];
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
          return dateA > dateB ? -1 : 1; // most recent value should be at the beginning of array
        });
        break;

      default:
        break;
    }
  }

  function filterProductsByPrice(price) {
    if(!price) return;
    products = products.filter((p) => {
      const discount = p.discount;
      const discountedPrice = p.price - (p.price/100)*discount;
      return discountedPrice <= price;
    });
  }

  function onSearch(query) {
    if (!query) {
      setAllProducts(data.data);
      return;
    }

    const newProducts = data.data.filter(({ name }) => {
      if (name.toLowerCase().includes(query.toLowerCase())) return true;
      else if (
        compareTwoStrings(query.toLowerCase(), name.toLowerCase()) >= 0.5
      )
        return true;
      else return false;
    });
    setAllProducts(newProducts);
  }

  useEffect(() => {
    const products = data?.data;
    setAllProducts(products);

    let maxPrice=0;
    for (let i = 0; i < products?.length; i++) {
      const product = products[i];
      if (product.price > maxPrice) maxPrice = product.price;
    }
    setMaxPrice?.(maxPrice);
    setSearchParams?.({category, sortOption, price: maxPrice});
  }, [data]);


  if (data) {
    products = Array.from(allProducts || []);
    sortProducts(sortOption);
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
      <section className="w-9/12 mb-4">
        <SearchBar placeholder="Search for products..." onSearch={onSearch} />
      </section>

      <div className="flex flex-wrap gap-5">{productList}</div>

      {pageCount > 1 && (
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
      )}
    </div>
  );
}

export default ProductList;
