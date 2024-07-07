import { LineChart1, LineChart2 } from "../../components/Charts.jsx";

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

function LineCharts() {
  return (
    <main className="p-5 bg-white border shadow-md rounded w-full min-h-[98vh] flex flex-col gap-12">
      <h1 className="text-3xl font-medium text-black text-opacity-70 text-center">
        Line Charts
      </h1>

      <section className="w-[85%] flex flex-col gap-4 justify-center items-center mx-auto ">
        <LineChart1
          data={[200, 444, 333, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]}          
          bgColor="rgb(53, 162, 255, 0.1)"
          borderColor="rgb(0, 162, 255)"
          label="Users"
          labels={months}
          fill={true}
        />
        <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wide">
          ACTIVE USERS
        </h2>
      </section>

      <section className="w-[85%] flex flex-col gap-4 justify-center items-center mx-auto ">
        <LineChart2
          data1={[200, 444, 333, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]}          
          data2={[200, 344, 233, 456, 678, 355, 890, 444, 156, 347, 900, 1100]}          
          borderColor1="rgb(45, 212, 191)"
          bgColor1="rgb(45, 212, 191, 0.1)"

          borderColor2="rgb(13, 148, 136)"
          bgColor2="rgb(13, 148, 136, 0.1)"
          // bgColor1="rgb(22, 163, 74, 0.1)"
          // bgColor2="rgb(220, 38, 38, 0)"
          // borderColor1="rgb(22 163 74)"
          // borderColor2="rgb(220, 38, 38, 0)"
          label1="Revenue"
          label2="Profit"
          labels={months}
          fill={true}
        />
        <h2 className="font-medium text-lg text-black text-opacity-70 tracking-wide">
          REVENUE & PROFIT
        </h2>
      </section>
    </main>
  );
}

export default LineCharts;
