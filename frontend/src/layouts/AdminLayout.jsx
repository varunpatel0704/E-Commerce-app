import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { RiDashboardFill, RiBox3Fill, RiCoupon3Fill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaChartPie, FaChartBar, FaChartLine,  } from "react-icons/fa";

function DashboardLayout() {
  const location = useLocation();
  return (
    <main className="min-h-screen flex p-2 gap-3 bg-stone-200 bg-opacity-25 ">
      <main className="w-[20%] h-[98vh] border rounded bg-white shadow-md flex flex-col gap-6 sticky">
        <h2 className="text-3xl p-4">
          <Link to="/">Logo</Link>
        </h2>
        {/* Dashboard */}
        <div className="flex flex-col gap-3 px-5">
          <h4 className="tracking-widest text-sm opacity-40 font-medium">
            DASHBOARD
          </h4>
          <ul className="flex flex-col gap-2.5 px-2">
            <Li
              text="Key Insights"
              location={location}
              url="/admin/dashboard/insights"
              Icon={RiDashboardFill}
            />
            <Li
              text="Products"
              location={location}
              url="/admin/dashboard/products"
              Icon={RiBox3Fill}
            />
            <Li
              text="Users"
              location={location}
              url="/admin/dashboard/users"
              Icon={IoIosPeople}
            />
            <Li
              text="Orders"
              location={location}
              url="/admin/dashboard/orders"
              Icon={AiFillFileText}
            />
          </ul>
        </div>

        {/* Analytics */}
        <div className="flex flex-col gap-4 px-5 mt-2">
          <h3 className="tracking-widest text-sm opacity-40 font-medium">
            ANALYTICS
          </h3>
          <ul className="flex flex-col gap-2.5 px-2">
          <Li
              text="Bar"
              url="/admin/analytics/bar"
              location={location}
              Icon={FaChartBar}
            />
            
            <Li
              text="Pie"
              url="/admin/analytics/pie"
              location={location}
              Icon={FaChartPie}
            />
            
            <Li
              text="Line"
              url="/admin/analytics/line"
              location={location}
              Icon={FaChartLine}
            />
          </ul>
        </div>

        {/* Utilities */}
        <div className="flex flex-col gap-4 px-5 mt-2">
          <h3 className="tracking-widest text-sm opacity-40 font-medium">
            UTILITIES
          </h3>
          <ul className="flex flex-col gap-2.5 px-2">
            <Li
              text="Generate Coupon"
              url="/admin/utilities/generateCoupon"
              location={location}
              Icon={RiCoupon3Fill}
            />
          </ul>
        </div>
      </main>

      <main className="w-[80%] h-full">
        <Outlet />
      </main>
    </main>
  );
}

function Li({ text, location, Icon, url }) {
  // const atLocation = location.pathname === url;
  const atLocation = location.pathname.includes(url);

  return (
    <li
      style={{
        transform: atLocation && "scale(1.05)",
        transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",

        backgroundColor: atLocation ? "rgba(0, 115, 255, 0.1)" : "white",

        boxShadow: atLocation ? "0 1px 3px 0 rgba(0,0,0,0.1)" : "none",
      }}
      className="py-1.5 px-2.5 rounded-md text-black text-opacity-70"
    >
      <Link to={`${url}`} style={{ color: atLocation && "rgba(0,115,255)" }}>
        <p className="flex gap-2.5 items-center">
          <Icon />
          {text}
        </p>
      </Link>
    </li>
  );
}

export default DashboardLayout;
