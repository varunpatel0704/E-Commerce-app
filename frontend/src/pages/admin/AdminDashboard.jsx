import { BsSearch } from "react-icons/bs";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { BarChart, DoughnutChart } from "../../components/Charts.jsx";
import { BiMaleFemale } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import DashboardTable from "../../components/DashboardTable.jsx";
import { useGetInsightsQuery } from "../../features/dashboard/dashboardApiSlice.js";

function AdminDashboard() {
  const { data, isLoading, isError } = useGetInsightsQuery();
  console.log(data);
  if (isLoading) return <h1>Loading...</h1>;
  else if (isError) return <h1>Error...</h1>;
  const {
    genderRatio,
    inventory,
    revenueAndOrders: { start, end, revenue, orders },
    widget,
    topOrders,
  } = data?.data;
  const months = [];
  const startDate = new Date(start);
  for (let i = 0; i < 6; i++) {
    const date = new Date(startDate.getFullYear(), startDate.getMonth() + i);
    const month = date.toLocaleString("default", { month: "long" });
    months.push(month);
  }

  return (
    <main className="p-1">
      {/* search bar */}
      {/* <div className="h-12 flex items-center border-b border-black border-opacity-30">
        <button className="p-2">
          <BsSearch />
        </button>
        <input
          type="text"
          placeholder="Search for data, users, docs "
          className="bg-transparent outline-none py-1 px-2 w-full"
        />
      </div> */}

      {/* statistics cards */}
      <section className="p-2 flex justify-between transition-all">
        <Widget
          heading="Revenue"
          amount={true}
          value={widget.revenue.value}
          percent={widget.revenue.percent}
          color="rgb(0, 115, 255)"
        />
        <Widget
          heading="Users"
          value={widget.users.value}
          percent={widget.users.percent}
          color="rgb(0, 198, 202)"
        />
        <Widget
          heading="Orders"
          value={widget.orders.value}
          percent={widget.orders.percent}
          color="rgb(255, 196, 0)"
        />
        <Widget
          heading="Products"
          value={widget.products.value}
          percent={widget.products.percent}
          color="rgb(76, 0, 255)"
        />
      </section>

      {/* revenue and inventory chart */}
      <section className="flex w-full gap-3 p-1 h-[27rem] transition-all my-5">
        <div className="w-[75%] border py-4 px-3.5 bg-white rounded-md shadow-md ">
          <h2 className="mb-3 text-center tracking-wider text-xl font-semibold text-black text-opacity-70">
            REVENUE & ORDERS
          </h2>
          <BarChart
            // data1={[300, 144, 433, 655, 237, 755, 190]}
            // data2={[200, 444, 343, 556, 788, 455, 990]}
            data1={revenue}
            data2={orders}
            label1={"Revenue"}
            label2={"Orders"}
            bgColor1="rgb(0, 115, 255)"
            bgColor2="rgb(53, 162, 235, 0.8)"
            labels={months}
          />
        </div>

        {/* inventory => dynamically rendered, don'nt know the number of catergories to be rendered */}
        <div className="w-[25%] border bg-white rounded-md shadow-md scroll-hidden py-4 px-3.5">
          <h2 className="text-center mb-5 tracking-wider text-xl font-semibold text-black text-opacity-70">
            INVENTORY
          </h2>
          <ul className="flex flex-col gap-5">
            {inventory.map(({ _id, name, initialStock, stock }) => {
              const heading = name[0].toUpperCase() + name.slice(1);
              let percent = Math.round((stock/initialStock) * 100);
              return (
                <InventoryItem
                  key={_id}
                  id={_id}
                  heading={heading}
                  percent={percent}
                  color={
                    70 < percent && percent <= 100
                      ? "green"
                      : 30 < percent && percent <= 70
                      ? "yellow"
                      : "red"
                  }
                />
              );
            })}
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
            data={[genderRatio, 100 - genderRatio]} //[Male, Female]
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
            data={
              topOrders.map(({_id: id, createdAt, priceDetails, orderItems})=>({
                id: <Link to={`/admin/dashboard/orders/manage/${id}`} className="header-dialog-link">{id}</Link>,
                date: new Date(createdAt).toDateString(), 
                amount: priceDetails.total,
                status: orderItems[0].status.currentStatus,
              }))
              
            }
          />
        </div>
      </section>

      {/* <Link to={"/admin/analytics/bar"}>
        <p className="flex relative left-[60vw] text-blue-500 items-center gap-2 mt-3">
          Get More Insights <BsArrowRight />
        </p>
      </Link> */}
    </main>
  );
}

function Widget({ heading, value, amount = false, percent, color }) {
  percent = Math.round(percent);
  let doughnutPercent = percent;
  if (percent > 100) doughnutPercent = 100;
  if (percent > 99999) percent = 99999;
  return (
    <article className="border bg-white p-6 rounded-lg shadow-md flex justify-between gap-4">
      <div className="flex flex-col">
        <h4 className="text-sm font-medium text-gray-500">{heading}</h4>
        <p className="text-xl font-bold">{amount ? `₹${value}` : value}</p>

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
          data={[Math.abs(doughnutPercent), 100 - Math.abs(doughnutPercent)]}
          bgColor={[color, "rgb(0, 0, 0, 0.05)"]}
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

function InventoryItem({id, heading, color, percent }) {
  return (
    <Link to={`/admin/dashboard/products/edit/${id}`}>
      <li className="h-8 flex justify-around items-center border border-gray-100 rounded-md shadow-sm gap-2.5 py-1 px-2 text-xs tracking-wide">
        <h5 className="w-[25%] scroll-hidden h-8">{heading}</h5>
        <div className="bg-gray-300 bg-opacity-70 rounded-full w-[60%]">
          <div
            style={{ width: `${percent}%`, backgroundColor: color }}
            className="h-2 rounded-tl-full rounded-bl-full rounded-full"
          ></div>
        </div>
        <span className="w-[15%] font-medium">{percent}%</span>
      </li>
    </Link>
  );
}

export default AdminDashboard;
