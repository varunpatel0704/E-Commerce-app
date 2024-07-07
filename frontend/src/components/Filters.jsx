import { useState } from "react";

function CheckBox({ id, name, label, onOrderFilterChange }) {
  return (
    <div className="flex gap-2">
      <input
        type="radio"
        name={name}
        id={id}
        defaultChecked={id==='all orders' || id==='all time'}
        onClick={e=>onOrderFilterChange(prev=>({...prev, [name]:id }))}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function Filters({ onProductSortChange, type, onOrderFilterChange }) {
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState(100000);

  let content;
  if (type === "product-search") {
    content = (
      <>
        <hr className="border" />
        <div className="filter-category">
          <h4 className="mb-1.5 font-medium">Category </h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-slate-400 border outline-none rounded p-2"
          >
            <option value="all">All</option>
            <option value="cameras">Cameras</option>
            <option value="laptops">Laptops</option>
            {/* Add more categories */}
          </select>
        </div>

        {/* <hr className="border"/> */}

        <div className="filter-price">
          <h4 className="font-medium">Price Upto {price}</h4>
          <input
            className="w-11/12 mt-1"
            type="range"
            min={100}
            max={100000}
            step={100}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        {/* Add more filters as needed */}
        <hr className="border" />

        <div className="sort-options flex-shrink">
          <h3 className="text-xl mb-1.5 font-medium">Sort By</h3>
          <select
            onChange={(e) => onProductSortChange(e.target.value)}
            className="border-slate-400 border outline-none rounded p-2"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popularity">Popularity</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>
      </>
    );
  } else {
    content = (
      <>
        <hr className="border" />

        <div className="flex flex-col gap-2.5">
          <h4 className="text-lg mb-1 font-medium">Order Status</h4>
          
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="all orders"
            name='orderStatus'
            label="All"
          />
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="confirmed"
            name='orderStatus'
            label="On the way"
          />
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="delivered"
            name='orderStatus'
            label="Delivered"
          />
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="canceled"
            name='orderStatus'
            label="Canceled"
          />
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="returned"
            name='orderStatus'
            label="Returned"
          />
        </div>
        <hr className="border" />

        <div className="flex flex-col gap-2.5">
          <h4 className="text-lg mb-1 font-medium">Order Time</h4>
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="all time"
            name='time'
            label="All time"
          />
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="30 days"
            name='time'
            label="Last 30 days"
          />
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="6 months"
            name='time'
            label="Last 6 months"
          />
          <CheckBox
            onOrderFilterChange={onOrderFilterChange}
            id="year"
            name='time'
            label="Last year"
          />
          
        </div>
      </>
    );
  }

  return (
    <div className="filters flex sm:flex-col gap-5 p-5">
      <h3 className="text-2xl font-medium">Filters</h3>
      {/* Add filter options here */}
      {content}
    </div>
  );
}

export default Filters;
