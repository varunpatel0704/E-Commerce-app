import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductFilter from "../components/ProductFilter.jsx";
import ProductList from "../components/ProductList.jsx";
import { useGetCategoriesQuery } from "../features/products/productApiSlice.js";

function Categories({ categories }) {
  return (
    <div className="flex flex-wrap gap-5">
      {categories.map((category) => (category.category !=='latest' && category.category !== 'trending' &&
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  );
}

function ProductListing() {
  const [page, setPage] = useState(1);
  const pages = 10;

  const [searchParams, setSearchParams] = useSearchParams({
    category: "all",
    sortOption: "default",
    price: 100000,
  }); // will act as state as well.
  const category = searchParams.get("category");
  console.log("current category filter: ", category);

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetCategoriesQuery();

  const categories = data?.data;
  console.log(categories);

  if (isLoading) return <h1>Loading...</h1>;

  else
  return (
    <div className="w-full h-section flex gap-6 sm:flex-row flex-col">
      <aside className=" border sm:w-[25%] w-full sticky top-0 shadow-md rounded">
        <ProductFilter
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          categories={categories}
        />
      </aside>
      <main className=" sm:w-4/5 w-full">
        <div className="flex flex-wrap gap-5">
          {category === "all" ? (
            <Categories categories={categories} />
          ) : (
            <ProductList category={category} />
          )}
        </div>

        <article className="flex justify-center items-center mt-5 text-sm">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="mx-2 border text-sm  py-1 px-2.5 rounded-lg shadow product-search-pagination-btn"
          >
            Prev
          </button>
          <span>
            {page} of {pages}
          </span>
          <button
            disabled={page === pages}
            onClick={() => setPage((p) => p + 1)}
            className="mx-2 border py-1 px-2.5 rounded-lg shadow product-search-pagination-btn"
          >
            Next
          </button>
        </article>
      </main>
    </div>
  );
}

export default ProductListing;
