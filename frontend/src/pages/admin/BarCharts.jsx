import React from "react";
import { BarChart } from "../../components/Charts.jsx";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function BarCharts() {
  const topProducts = [1, 3, 5, 7, 9, 11, 13, 15, 29, 6, 17, 12];
  const topCategories = [11, 23, 3, 4, 5, 6, 17, 28, 9, 10, 12, 5];
  const productsThroughout = [];
  const categoriesThroughout = [];

  return (
    <main className="p-5 bg-white border shadow-md rounded w-full min-h-[98vh] flex flex-col gap-12">
      <h1 className="text-3xl font-medium text-black text-opacity-70 text-center">
        Bar Charts
      </h1>
      <section className="w-[85%] flex flex-col gap-4 justify-center items-center mx-auto ">
        <BarChart
          data1={topProducts}
          data2={topCategories}
          label1="Top Products"
          label2="Top Categories"
          bgColor1="#00bfa0"
          bgColor2="#0060ff"
          labels={months}
        />
        <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wide">
          BEST SELLING PRODUCTS & CATEGORIES
        </h2>
      </section>

      <section className="w-[80%] flex flex-col gap-4 justify-center items-center mx-auto relative">
        {/* product select */}
        <div className="absolute top-0 right-[7rem]">
          <select name="product" id="" className="border outline-none p-0.5 rounded text-xs">
            <option value="product">Product</option>
            <option value="laptop">Laptop</option>
            <option value="camera">Camera</option>
            <option value="camera">Camera</option>
          </select>
        </div>

        {/* category select */}
        <div className="absolute top-0 right-[0rem]">
          <select name="product" id="" className="border outline-none p-0.5 rounded text-xs">
            <option value="categoory">Catergory</option>
            <option value="laptop">Laptop</option>
            <option value="camera">Camera</option>
            <option value="camera">Camera</option>
          </select>
        </div>
        <BarChart
          horizontal={true}
          label1="Product"
          label2="Category"
          data1={[1, 3, 5, 7, 9, 11, 13, 15, 29, 6, 17, 12]}
          data2={[11, 23, 3, 4, 5, 6, 17, 28, 9, 10, 12, 5]}
          bgColor1="#4ade80"
          bgColor2="#009596"
          // bgColor1="#EF9234"
          // bgColor2="#009596"
          labels={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
        />
        <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wide">ORDERS THROUGHOUT THE YEAR</h2>
      </section>
    </main>
  );
}

export default BarCharts;
