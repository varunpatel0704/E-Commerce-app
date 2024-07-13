import { Link } from "react-router-dom"
import TableHOC from "../../components/TableHOC.jsx"
import { useCallback } from "react"


const columns = [
  {
    Header: "ID",
    accessor: 'id'
  },
  {
    Header: "Date",
    accessor: 'date'
  },
  {
    Header: "Total",
    accessor: 'total'
  },
  {
    Header: "Status",
    accessor: 'status'
  },
  {
    Header: "Action",
    accessor: 'action'
  },
]

const data=[
  {
    id: 'aiada134kna',
    date: 'May 21, 2024',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
  {
    id: 'aiada134kna',
    total: '$1200',
    status: 'processing',
    action: <Link to={`/admin/dashboard/orders/manage/${'aiada134kna'}`}>Manage</Link>
  },
]

const onSearch = ()=>{};
function AdminOrders() {

  const OrdersTable = useCallback(
    TableHOC({
      showPagination: true,
      pageSize: 6,
      showSearch: true,
      columns,
      data,
      heading: "ORDERS",
      onSearch,
      containerClassName: 'orders-table-dashboard'
    })
    ,[]);

  return (
    <main className="bg-white p-5 pl-7 border shadow-md rounded w-full min-h-[98vh] relative">
      {<OrdersTable/>}
    </main>
  )
}

export default AdminOrders