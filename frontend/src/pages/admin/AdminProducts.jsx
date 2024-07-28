import { useCallback } from "react";
import TableHOC from "../../components/TableHOC.jsx";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useGetAllProductsQuery } from "../../features/products/productsApiSlice.js";

// const src =
//   "data:image/jpeg;base64,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";

const columns = [
  {
    Header: "Image",
    accessor: "image",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

function AdminProductWrapper(){ //necessary, otherwise react throws error: less hooks rendered.
  const {data, isLoading, isError, error, isSuccess} = useGetAllProductsQuery();
  
  const products = data?.data;
  console.log(products);
  const rows = products?.map(({_id, image, name, price, stock})=>({
    image: <Link to={`/products/${_id}`}><img src={image} /></Link>, 
    name,
    price: `₹${price}`,
    stock,
    action: <Link to={`/admin/dashboard/products/edit/${_id}`} className="product-edit-link" >Edit</Link>,
  }));

  if(isLoading) return <h1>Loading...</h1>

  else return <AdminProducts rows = {rows}/>;

}

function AdminProducts({rows}) { 

  const ProductsTable = useCallback(
    TableHOC({
      showPagination: true,
      showSearch: true,
      columns,
      data: rows,
      heading: "PRODUCTS",
      containerClassName: "products-table-dashboard",
    }),
    []
  );
  
  return (
    <main className="bg-white p-5 pl-7 border shadow-md rounded w-full min-h-[98vh] relative">
      <div className="add-product-btn-dashboard" >
        <Link to="/admin/dashboard/products/new">
          <FaPlus />
        </Link>
      </div>
      {<ProductsTable/>}
    </main>
  );
}

export default AdminProductWrapper;
