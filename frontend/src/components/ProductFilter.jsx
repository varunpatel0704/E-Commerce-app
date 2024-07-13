function ProductFilter({ searchParams, setSearchParams, categories }) {
  const category = searchParams.get("category");
  const sortOption = searchParams.get("sortOption");
  const price = searchParams.get("price");

  return (
    <div className="filters flex sm:flex-col gap-5 p-5">
      <h3 className="text-2xl font-medium text-black text-opacity-70">Filters</h3>
      {/* Add filter options here */}
      <hr className="border" />
      <div className="filter-category">
        <h4 className="mb-1.5 font-medium text-black text-opacity-70">Category </h4>
        <select
          value={category}
          onChange={
            (e) =>
              setSearchParams({ category: e.target.value, sortOption, price }) // manually need to set both otherwise one will be lost.
          }
          className="border-slate-400 border outline-none rounded p-2"
        >
          <option value="all" key={'default'}>All</option>
          {categories.map(({ _id, category }) => category!=='latest' && category !=='trending'&&(
            <option key={_id} value={category}>
              {category[0].toUpperCase()+category.slice(1)}
            </option>
          ))}
          {/* Add more categories */}
        </select>
      </div>

      {/* <hr className="border"/> */}

      <div className="filter-price">
        <h4 className="font-medium text-black text-opacity-70">Price Upto {price}</h4>
        <input
          className="w-11/12 mt-1"
          type="range"
          min={100}
          max={100000}
          step={100}
          value={price}
          onChange={(e) =>
            setSearchParams({ category, sortOption, price: e.target.value })
          }
        />
      </div>
      {/* Add more filters as needed */}
      <hr className="border" />

      <div className="sort-options flex-shrink">
        <h3 className="text-xl mb-1.5 font-medium text-black text-opacity-70">Sort By</h3>
        <select
          value={sortOption}
          onChange={(e) =>
            setSearchParams({ category, sortOption: e.target.value, price })
          }
          className="border-slate-400 border outline-none rounded p-2"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="popularity">Popularity</option>
          <option value="newest">Newest Arrivals</option>
        </select>
      </div>
    </div>
  );
}

export default ProductFilter;
