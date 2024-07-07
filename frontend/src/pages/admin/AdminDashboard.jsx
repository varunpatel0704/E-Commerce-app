import { BsSearch } from "react-icons/bs";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { BarChart, DoughnutChart } from "../../components/Charts.jsx";
import { BiMaleFemale } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import DashboardTable from "../../components/DashboardTable.jsx";

function AdminDashboard() {
  return (
    <main className="p-1">
      {/* search bar */}
      <div className="h-12 flex items-center border-b border-black border-opacity-30">
        <button className="p-2">
          <BsSearch />
        </button>
        <input
          type="text"
          placeholder="Search for data, users, docs "
          className="bg-transparent outline-none py-1 px-2 w-full"
        />
      </div>

      {/* statistics cards */}
      <section className="my-5 p-2 flex justify-between transition-all">
        <Widget
          heading="Revenue"
          amount={true}
          value={342000}
          percent={40}
          color="rgb(0, 115, 255)"
        />
        <Widget
          heading="Users"
          value={4000}
          percent={-14}
          color="rgb(0, 198, 202)"
        />
        <Widget
          heading="Orders"
          value={2300}
          percent={80}
          color="rgb(255, 196, 0)"
        />
        <Widget
          heading="Products"
          value={1000}
          percent={30}
          color="rgb(76, 0, 255)"
        />
      </section>

      {/* revenue and inventory chart */}
      <section className="flex w-full gap-3 p-1 h-[27rem] transition-all">
        <div className="w-[75%] border py-4 px-3.5 bg-white rounded-md shadow-md ">
          <h2 className="mb-3 text-center tracking-wider text-xl font-semibold text-black text-opacity-70">
            REVENUE & ORDERS
          </h2>
          <BarChart
            data1={[300, 144, 433, 655, 237, 755, 190]}
            data2={[200, 444, 343, 556, 788, 455, 990]}
            label1={"Revenue"}
            label2={"Orders"}
            bgColor1="rgb(0, 115, 255)"
            bgColor2="rgb(53, 162, 235, 0.8)"
            labels={[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ]}
          />
        </div>

        {/* inventory => dynamically rendered, don'nt know the number of catergories to be rendered */}
        <div className="w-[25%] border bg-white rounded-md shadow-md scroll-hidden py-4 px-3.5">
          <h2 className="text-center mb-5 tracking-wider text-xl font-semibold text-black text-opacity-70">
            INVENTORY
          </h2>
          <ul className="flex flex-col gap-5">
            <InventoryItem heading={"Laptop"} value={80} color={"blue"} />
            <InventoryItem heading={"Camera"} value={20} color={"green"} />
            <InventoryItem heading={"Headphones"} value={40} color={"orange"} />
            <InventoryItem heading={"Laptop"} value={80} color={"blue"} />
            <InventoryItem heading={"Camera"} value={20} color={"green"} />
            <InventoryItem heading={"Headphones"} value={40} color={"orange"} />
            <InventoryItem heading={"Laptop"} value={80} color={"blue"} />
            <InventoryItem heading={"Camera"} value={20} color={"green"} />
            <InventoryItem heading={"Headphones"} value={40} color={"orange"} />
            <InventoryItem heading={"Laptop"} value={80} color={"blue"} />
            <InventoryItem heading={"Camera"} value={20} color={"green"} />
            <InventoryItem heading={"Headphones"} value={40} color={"orange"} />
          </ul>
        </div>
      </section>

      {/* doughnut chart and orders table */}
      <section className="w-full flex gap-4 mt-5 h-[22rem] p-1">
        <div className="bg-white w-[25%] border rounded-lg shadow-md relative text-black text-opacity-70 p-2">
          <h2 className="text-center tracking-wider text-xl font-semibold p-2 mb-8">
            GENDER RATIO
          </h2>

          {/* chart */}
          <DoughnutChart
            data={[12, 9]}
            labels={["Female", "Male"]}
            bgColor={["hsl(340, 82%, 56%", "rgb(53, 162, 235, 0.8)"]}
            cutout={80}
          />

          <p className="chart-pos-center text-3xl top-[70%]">
            <BiMaleFemale />
          </p>
        </div>

        {/* Table */}
        <div className="w-[75%] bg-white border rounded-lg shadow-md">
          <DashboardTable
            showPagination={true}
            heading="TOP ORDERS"
            containerClassName="order-analytics-table-dashboard"
            // data={[
            //   {
            //     id: "12345",
            //     quantity: "10",
            //     discount: "50%",
            //     amount: "116000",
            //     status: "processing",
            //   },
            //   {
            //     id: "12346",
            //     quantity: "10",
            //     discount: "50%",
            //     amount: "1216000",
            //     status: "processing",
            //   },
            // ]}
          />
        </div>
      </section>

      <Link to={'/admin/analytics/bar'}><p className="flex relative left-[60vw] text-blue-500 items-center gap-2 mt-3" >Get More Insights <BsArrowRight/></p></Link>
    </main>
  );
}

function Widget({ heading, value, amount = false, percent, color }) {
  return (
    <article className="border bg-white p-6 rounded-lg shadow-md flex justify-between gap-4">
      <div className="flex flex-col gap">
        <h4 className="text-sm font-medium text-gray-500">{heading}</h4>
        <p className="text-xl font-bold">{amount ? `$${value}` : value}</p>

        {percent > 0 ? (
          <span className="text-green-600 flex items-center gap-0.5">
            <HiTrendingUp />+{percent}%
          </span>
        ) : (
          <span className="text-red-600 flex items-center gap-0.5">
            <HiTrendingDown />
            {percent}%
          </span>
        )}
        <h6 className="text-[0.6rem] font-medium text-gray-500">This month</h6>
      </div>
      {/* <div className="widgetCircle border w-20 h-20 relative flex-none grid place-items-center bg-teal-600 rounded-full before:absolute before:bg-white before:rounded-full before:w-16 before:h-16"> */}
      {/* <div
        className="widgetCircle"
        style={{
          background: `conic-gradient(
          ${color} ${(Math.abs(percent) / 100) * 360}deg, rgb(255, 255, 255) 0
        )`,
        }}
      >
        <span className="absolute" style={{ color: color }}>
          {percent}%
        </span>
      </div> */}

      <div className="h-[5.5rem] w-[5.5rem] flex justify-center items-center relative">
        <DoughnutChart
          data={[Math.abs(percent), 100 - Math.abs(percent)]}
          bgColor={[color, "rgb(0, 0, 0, 0)"]}
          labels={[`${heading}%`, ""]}
          legend={false}
          cutout={35}
        />
        <span className="pos-center" style={{ color: color }}>
          {percent}%
        </span>
      </div>
    </article>
  );
}

function InventoryItem({ heading, color, value }) {
  return (
    <li className="flex justify-around items-center border border-gray-100 rounded-md shadow-sm gap-2.5 py-1 px-2 text-xs tracking-wide">
      <h5 className="w-[25%] scroll-hidden ">{heading}</h5>
      <div className="bg-gray-300 bg-opacity-70 rounded-full w-[60%]">
        <div
          style={{ width: `${value}%`, backgroundColor: color }}
          className="h-2 rounded-tl-full rounded-bl-full rounded-full"
        ></div>
      </div>
      <span className="w-[10%] font-medium">{value}%</span>
    </li>
  );
}

export default AdminDashboard;
