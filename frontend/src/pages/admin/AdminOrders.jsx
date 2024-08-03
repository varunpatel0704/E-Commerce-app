import { Link } from "react-router-dom";
import TableHOC from "../../components/TableHOC.jsx";
import { useCallback, useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../features/orders/ordersApiSlice.js";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Total",
    accessor: "total",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

function AdminOrdersWrapper() {
  const { data: res, isLoading, isError } = useGetAllOrdersQuery();
  if (isLoading) return <h1>Loading...</h1>;
  else if (isError) return <h1>Error...</h1>;
  let orders = res?.data;

  console.log("all orders ", orders);
  const rows = [];

  // function onSearch(query){
  //   const newOrders = orders.filter(({ _id, priceDetails }) => {
  //     if(_id.toLowerCase().includes(query.toLowerCase()))
  //       return true;
  //     else if (compareTwoStrings(query.toLowerCase(), _id.toLowerCase()) >= 0.4) 
  //       return true;
  //     else if(priceDetails.total === query)
  //       return true;
  //     else  
  //       return false;
  //     }
  //   );
  // }

  
  for (let i = 0; i < orders.length; i++) {
    const {_id, createdAt, priceDetails, orderItems} = orders[i];
    let date = new Date(createdAt);
    date = date.toDateString();
    rows.push({
      id: _id,
      date,
      total: `₹${priceDetails.total}`,
      status: orderItems[0].status.currentStatus,
      action: (
        <Link to={`/admin/dashboard/orders/manage/${_id}`}>Manage</Link>
      ),
    });
  }

  
  return <AdminOrders rows={rows} />;
}

const onSearch = () => {};
function AdminOrders({ rows }) {
  const OrdersTable = useCallback(
    TableHOC({
      showPagination: true,
      pageSize: 6,
      showSearch: false,
      columns,
      data: rows,
      heading: "ORDERS",
      onSearch,
      containerClassName: "orders-table-dashboard",
    }),
    []
  );

  return (
    <main className="bg-white p-5 pl-7 border shadow-md rounded w-full min-h-[98vh] relative">
      {<OrdersTable />}
    </main>
  );
}

export default AdminOrdersWrapper;
