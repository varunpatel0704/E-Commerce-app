import { PieChart, DoughnutChart } from "../../components/Charts.jsx";
import { categories } from "../../../src/assets/data.json";

function PieCharts() {
  return (
    <main className="p-5 bg-white border shadow-md rounded w-full min-h-[98vh] flex flex-col gap-12">
      <h1 className="text-3xl font-medium text-black text-opacity-70 text-center">
        Pie & Doughnut Charts
      </h1>
      {/* order status */}
      <div className="grid grid-cols-2 grid-rows-3 justify-items-center items-stretch gap-y-10">
        <section className="flex flex-col gap-4 justify-center items-center w-[50%]">
          <div className="w-90%] h-[90%]">
            <PieChart
              data={[5, 12, 7, 3]}
              labels={["Processing", "Shipped", "Delivered", "Returned"]}
              // bgColor={["rgb(14 116 144)", "rgb(15 118 110)", "rgb(20 184 166)"]}
              bgColor={[
                'rgb(55 48 163)',
                'rgb(7 89 133)',
                'rgb(14 116 144)',
                'rgb(13 148 136)',


                // "rgb(244 63 94)",
                // "rgb(99 102 241)",
                // "rgb(168 85 247)",
                // "rgb(14 165 233)",
                // "#009596",
                // "#4CB140",
                // "#06C",
                // "#F4C145",
              ]}
              offset={[5, 5, 5, 5]}
            />
          </div>
          <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wider">
            ORDER FULFILLMENT RATIO
          </h2>
        </section>

        {/* category share */}
        <section className="flex flex-col gap-4 justify-center items-center w-[50%]">
          <div className="w-90%] h-[90%]">
            <DoughnutChart
              labels={categories.map((category) => category.heading)}
              data={categories.map((category) => category.value)}
              // bgColor={["rgb(14 116 144)", "rgb(15 118 110)", "rgb(20 184 166)"]}
              bgColor={categories.map(
                (category) =>
                  `hsl(${category.value * 4} ${category.value}% 50%)`
              )}
              // bgColor={["hsl(110 80% 80%)", "hsl(110 80% 50%)", "hsl(110 40% 50%)"]}
              offset={[15, 15, 15, 15]}
              cutout={[100]}
              legend={false}
            />
          </div>
          <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wider">
            CATEGORY SHARE
          </h2>
        </section>

        {/* user feedback */}
        <section className="flex flex-col gap-4 justify-center items-center w-[50%]">
          <div className="w-90%] h-[90%]">
            <PieChart
              labels={["Satisfied", "Unsatisfied", "Neutral"]}
              data={[32, 5, 18]}
              bgColor={["#009596", "#005F60", "#A2D9D9"]}
              offset={[15, 15, 15]}
              legend={false}
            />
          </div>
          <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wider">
            USER FEEDBACK
          </h2>
        </section>

        {/* user age group */}
        <section className="flex flex-col gap-4 justify-center items-center w-[50%]">
          <div className="w-90%] h-[90%]">
            <PieChart
              labels={["Below 20", "Between 20-60", "Above 60"]}
              data={[32, 18, 5]}
              bgColor={[
                "rgb(252 165 165)",
                "rgb(239 68 68)",
                "rgb(185, 28, 28)",
              ]}
              offset={[15, 15, 15]}
              legend={false}
            />
          </div>
          <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wider">
            USERS AGE GROUP
          </h2>
        </section>

         {/* revenue distribution */}
         <section className="flex flex-col gap-4 justify-center items-center w-[50%]">
          <div className="w-90%] h-[90%]">
            <DoughnutChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt Cost",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 18, 5, 20, 25]}
              bgColor={[
                "hsl(110 80% 40%)",
                "hsl(19 80% 40%)",
                "hsl(69 80% 40%)",
                "hsl(300 80% 40%)",
                "rgb(52, 162, 255)",
              ]}
              offset={[15, 15, 15, 15]}
              cutout={[100]}
              legend={false}
            />
          </div>
          <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wider">
            REVENUE DISTRIBUTION
          </h2>
        </section>
      </div>
    </main>
  );
}
export default PieCharts;
