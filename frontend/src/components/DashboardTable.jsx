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

function DashboardTable({data=[], containerClassName='', heading='', showPagination}) {
  
  return (
    TableHOC({columns, containerClassName, heading, data, showPagination})() //since TableHOC is returns a function reference, we need to call that fuction in order to actually generate the required table
  )
}

export default DashboardTable