import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryCard from "../components/CategoryCard.jsx";
import { Link } from "react-router-dom";
import ProductFilter from "../components/ProductFilter.jsx";
import ProductList from "../components/ProductList.jsx";
import { useGetCategoriesQuery } from "../features/products/productsApiSlice.js";
import SearchBar from "../components/SearchBar.jsx";
import { compareTwoStrings } from "string-similarity";

function Categories({ categories: categoryList, onClick }) {
  // implement the same logic in product list.
  const [allCategories, setAllCategories] = useState(categoryList);

  const [page, setPage] = useState(1);
  const pageSize = 12;
  const pageCount = Math.ceil(allCategories.length / pageSize);

  const begin = 0 + (page - 1) * pageSize;
  const end = pageSize + (page - 1) * pageSize;

  const categories = allCategories.slice(begin, end);
  function nextPage() {
    setPage((p) => p + 1);
  }
  function prevPage() {
    setPage((p) => p - 1);
  }

  function onSearch(query) {
    if (!query) {
      // console.log(categoryList);
      setAllCategories(categoryList);
      return;
    }

    const newCategories = categoryList.filter(({ category }) => {
      if(category.toLowerCase().includes(query.toLowerCase()))
        return true;
      else if (compareTwoStrings(query.toLowerCase(), category.toLowerCase()) >= 0.4) 
        return true;
      else  
        return false;
      }
    );
    setAllCategories(newCategories);
  }
  return (
    <div className="w-full">
      <p className="py-1 text-sm text-gray-600">
        <span><Link to={'/'} className="header-dialog-link">Home</Link> &gt;</span>
        <span> Products</span>
      </p>

      <section className="w-9/12 mb-4">
        {/* // implement search functionality */}
        <SearchBar placeholder="Search for categories..." onSearch={onSearch} />
      </section>

      <div className="flex flex-wrap gap-5">
        {categories.map((category) => (
          <CategoryCard
            key={category._id}
            category={category}
            onClick={onClick}
          />
        ))}
      </div>
      
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
// implement filters & pagination.

function ProductListing() {
  const [searchParams, setSearchParams] = useSearchParams({
    category: "all",
    sortOption: "default",
    price: 0,
  });
  const [maxPrice, setMaxPrice] = useState(0);
  // will act as state as well.
  const category = searchParams.get("category");

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
            maxPrice = {maxPrice}
          />
        </aside>
        <main className=" sm:w-4/5 w-full">
          {category === "all" ? (
            <Categories
              categories={categories}
              onClick={handleCategoryChange}
            />
          ) : (
            <ProductList              
              searchParams = {searchParams}
              setSearchParams = {setSearchParams}
              setMaxPrice = {setMaxPrice}
            />
          )}
        </main>
      </div>
    );
}

export default ProductListing;
