import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";
import ProductFilter from "../components/ProductFilter.jsx";
import ProductList from "../components/ProductList.jsx";
import { useGetCategoriesQuery } from "../features/products/productsApiSlice.js";

function Categories({ categories, onClick }) {
  // implement the same logic in product list.

  const [page, setPage] = useState(1);
  const pageSize = 12;
  const pageCount = Math.ceil(categories.length/pageSize);
  
  const begin = 0+(page-1)*pageSize;
  const end = pageSize+(page-1)*pageSize;

  categories = categories.slice(begin, end);
  function nextPage(){
    setPage(p=>p+1);
  }
  function prevPage(){
    setPage(p=>p-1);
  }

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-5">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onClick={onClick}
          />
        ))}
      </div>
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
// implement filters & pagination.

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams({
    category: "all",
    sortOption: "default",
    price: 100000,
  }); // will act as state as well.
  const category = searchParams.get("category");
  const sortOption = searchParams.get("sortOption");
  const price = searchParams.get("price");

  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetCategoriesQuery();

  const categories = data?.data;

  function handleCategoryChange(category) {
    const sortOption = searchParams.get("sortOption");
    const price = searchParams.get("price");
    setSearchParams({
      category,
      sortOption,
      price,
    });
  }

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
          
            {category === "all" ? (
              <Categories
                categories={categories}
                onClick={handleCategoryChange}
              />
            ) : (
              <ProductList category={category} sortBy={sortOption} price={price}/>
            )}
          
        </main>
      </div>
    );
}

export default ProductListing;
