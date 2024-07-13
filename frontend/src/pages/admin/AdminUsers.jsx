import { useCallback } from "react";
import TableHOC from "../../components/TableHOC.jsx";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";

const columns = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const src1 = 'https://randomuser.me/api/portraits/men/52.jpg'
const src2 = 'https://randomuser.me/api/portraits/women/32.jpg'

const data = [
  {
    avatar: <img src={src1} />,
    name: "John",
    gender: 'Male',
    email: 'johnDone@doodle.com',
    role: 'User',
    action: <Link><BsTrash style={{display: 'inline'}} /></Link>
  },
  {
    avatar: <img src={src2} />,
    name: "Jane",
    gender: 'Female',
    email: 'janeDone@doodle.com',
    role: 'User',
    action: <Link><BsTrash style={{display: 'inline'}} /></Link>
  },
  {
    avatar: <img src={src1} />,
    name: "John",
    gender: 'Male',
    email: 'johnDone@doodle.com',
    role: 'User',
    action: <Link><BsTrash style={{display: 'inline'}} /></Link>
  },
  {
    avatar: <img src={src2} />,
    name: "Jane",
    gender: 'Female',
    email: 'janeDone@doodle.com',
    role: 'User',
    action: <Link><BsTrash style={{display: 'inline'}} /></Link>
  },
  {
    avatar: <img src={src1} />,
    name: "John",
    gender: 'Male',
    email: 'johnDone@doodle.com',
    role: 'User',
    action: <Link><BsTrash style={{display: 'inline'}} /></Link>
  },
  {
    avatar: <img src={src2} />,
    name: "Jane",
    gender: 'Female',
    email: 'janeDone@doodle.com',
    role: 'User',
    action: <Link><BsTrash style={{display: 'inline'}} /></Link>
  },
];

function AdminUsers() {
  const UsersTable = useCallback(
    TableHOC({
      columns,
      data,
      heading: "USERS",
      containerClassName: "users-table-dashboard",
      showPagination: true,
      pageSize: 4,
      showSearch: true
    }),
    []
  );

  return (
    <main className="bg-white p-5 pl-7 border shadow-md rounded w-full min-h-[98vh] relative">
      {<UsersTable/>}
    </main>
  );
}

export default AdminUsers;
