import { useCallback } from "react";
import TableHOC from "../../components/TableHOC.jsx";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../features/users/usersApiSlice.js";
import toast from "react-hot-toast";

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
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Gender",
    accessor: "gender",
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

// const data = [
//   {
//     avatar: <img src={src1} />,
//     name: "John",
//     gender: 'Male',
//     email: 'johnDone@doodle.com',
//     role: 'User',
//     action: <Link><BsTrash style={{display: 'inline'}} /></Link>
//   },
//   {
//     avatar: <img src={src2} />,
//     name: "Jane",
//     gender: 'Female',
//     email: 'janeDone@doodle.com',
//     role: 'User',
//     action: <Link><BsTrash style={{display: 'inline'}} /></Link>
//   },
//   {
//     avatar: <img src={src1} />,
//     name: "John",
//     gender: 'Male',
//     email: 'johnDone@doodle.com',
//     role: 'User',
//     action: <Link><BsTrash style={{display: 'inline'}} /></Link>
//   },
//   {
//     avatar: <img src={src2} />,
//     name: "Jane",
//     gender: 'Female',
//     email: 'janeDone@doodle.com',
//     role: 'User',
//     action: <Link><BsTrash style={{display: 'inline'}} /></Link>
//   },
//   {
//     avatar: <img src={src1} />,
//     name: "John",
//     gender: 'Male',
//     email: 'johnDone@doodle.com',
//     role: 'User',
//     action: <Link><BsTrash style={{display: 'inline'}} /></Link>
//   },
//   {
//     avatar: <img src={src2} />,
//     name: "Jane",
//     gender: 'Female',
//     email: 'janeDone@doodle.com',
//     role: 'User',
//     action: <Link><BsTrash style={{display: 'inline'}} /></Link>
//   },
// ];

function AdminUsersWrapper(){
  const {data, isLoading, isFetching, isError, isSuccess} = useGetAllUsersQuery();
  const [deleteUser, del] = useDeleteUserMutation();

  const users = data?.data;
  console.log(users);
  async function handleDelete(id){
    try {
      const res = await deleteUser(id).unwrap();
      if(res){
        toast.success('User removed');
      }
    } catch (error) {
      toast.error('User not removed');
    }
  }

  const rows = users?.map(({_id, fullName, email, role, gender, avatar})=>({
    avatar: <img src={avatar} alt="Profile" />,
    name: fullName,
    email,
    gender,
    role,
    action: <Link onClick={()=>handleDelete(_id)} ><BsTrash style={{display: 'inline'}} /></Link>
  }))

  if(isLoading || del.isLoading ) return <h1>Loading...</h1>;

  else return <AdminUsers rows={rows}/>;

}

function AdminUsers({rows}) {
  const UsersTable = useCallback(
    TableHOC({
      columns,
      data: rows,
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
      <div className="add-product-btn-dashboard" >
        <Link to="/admin/dashboard/users/create">
          <FaPlus />
        </Link>
      </div>
      {<UsersTable/>}
    </main>
  );
}

export default AdminUsersWrapper;
