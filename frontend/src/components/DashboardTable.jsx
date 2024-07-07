import TableHOC from "./TableHOC.jsx"
import {Link} from 'react-router-dom'

const columns = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
]

const dummyData =[
  {
    id: <Link to={`/admin/dashboard/orders/manage/${'123456787900989089oi'}`} >123456787900989089oi</Link>,
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
    id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
   id: "123456787900989089oi",
    date: 'May 21, 2024',
    amount: "116000",
    status: "processing",
  },
  {
    id: "119",
    quantity: "10",
    discount: "1000%",
    amount: "-1000",
    status: "🤡",
  },
]

function DashboardTable({data=dummyData, containerClassName='', heading='', showPagination}) {
  return (
    TableHOC({columns, containerClassName, heading, data, showPagination})() //since TableHOC is returns a function reference, we need to call that fuction in order to actually generate the required table
  )
}

export default DashboardTable