import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import Layout from "./layouts/Layout.jsx";
import Checkout from "./pages/Checkout.jsx"; //implement lazy
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProductSearch from "./pages/ProductSearch.jsx";
import Orders from "./pages/Orders.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import NewProductForm from "./pages/admin/NewProductForm.jsx";
import EditProductForm from "./pages/admin/EditProductForm.jsx";
import ManageOrder from "./pages/admin/ManageOrder.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import BarCharts from "./pages/admin/BarCharts.jsx";
import PieCharts from "./pages/admin/PieCharts.jsx";
import LineCharts from "./pages/admin/LineCharts.jsx";
import GenerateCoupon from "./pages/admin/GenerateCoupon.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";
import Products from "./pages/Products.jsx";
// import ProductForm from "./components/ProductForm.jsx";

const Profile = lazy(() => import("./pages/Profile.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route path="products" element={<ProductSearch />} />
          <Route path="products/:id" element={<ProductDetails />} />

          <Route path="cart" element={<Cart />} />

          {/* Login required for below routes */}
          <Route element={<RequireAuth />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:orderId" element={<OrderDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        {/* admin role required for below routes */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route element={<RequireAuth adminRoute={true} />}>
            <Route path="dashboard">
              <Route path="insights" element={<AdminDashboard />} />

              <Route path="products">
                <Route index element={<AdminProducts />} />
                <Route path="new" element={<NewProductForm />} />
                <Route path="edit/:id" element={<EditProductForm />} />
                {/* <Route path="new" element={<ProductForm/>} /> */}
              </Route>

              <Route path="users" element={<AdminUsers />} />

              <Route path="orders">
                <Route index element={<AdminOrders />} />
                <Route path="manage/:id" element={<ManageOrder />} />
              </Route>
            </Route>

            <Route path="analytics">
              <Route path="bar" element={<BarCharts />} />
              <Route path="pie" element={<PieCharts />} />
              <Route path="line" element={<LineCharts />} />
            </Route>

            <Route path="utilities">
              <Route path="generateCoupon" element={<GenerateCoupon />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

