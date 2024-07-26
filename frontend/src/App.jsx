import { Suspense, lazy, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import Loader from "./components/Loader.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";
import { usePersistentLoginMutation, usePersistentLoginQuery } from "./features/auth/authApiSlice.js";
import { loggedIn } from "./features/auth/authSlice.js";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Layout from "./layouts/Layout.jsx";
import Checkout from "./pages/Checkout.jsx"; //implement lazy
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import OrderDetails from "./pages/OrderDetails.jsx";
import Orders from "./pages/Orders.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import ProductSearch from "./pages/ProductSearch.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminUsers from "./pages/admin/AdminUsers.jsx";
import BarCharts from "./pages/admin/BarCharts.jsx";
import EditProductForm from "./pages/admin/EditProductForm.jsx";
import GenerateCoupon from "./pages/admin/GenerateCoupon.jsx";
import LineCharts from "./pages/admin/LineCharts.jsx";
import ManageOrder from "./pages/admin/ManageOrder.jsx";
import NewProductForm from "./pages/admin/NewProductForm.jsx";
import PieCharts from "./pages/admin/PieCharts.jsx";
import CreateUserForm from "./pages/admin/CreateUser.jsx";
import Payment from "./pages/Payment.jsx";
// import ProductForm from "./components/ProductForm.jsx";

const Profile = lazy(() => import("./pages/Profile.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));

function App() {
  const navigate = useNavigate();
  // implement persistent login. when the app component mounts, send a req to the server to verify the accessToken and automatically login if verified. 
  const dispatch = useDispatch();
  const [persistentLogin] = usePersistentLoginMutation();
  // const {data} = usePersistentLoginQuery();

  useEffect(()=>{
    (
      async function(){
        try {
          const res = await persistentLogin().unwrap();
          if(res.data){
            const {fullName, email, role, accessToken} = res.data;
            dispatch(loggedIn(fullName, email, role, accessToken));
            toast.success(`Welcome back, ${fullName}`);
            navigate('/')
          }
        } catch (error) {
          
        }
      }
    )()
  },[]);

  // useEffect(()=>{
  //   if(data){
  //     const {fullName, email, role, accessToken} = data.data;
  //     dispatch(loggedIn(fullName, email, role, accessToken));
  //     toast.success(`Welcome back, ${fullName}`);
  //   }
  // }, [data]);

  // useEffect(()=>{    
  //   (
  //     async function(){
  //       try {
  //         const res = await fetch('http://localhost:8000/api/v1/users/refresh-accessToken', {credentials: 'include', method: 'GET', mode: 'cors'});
  //         // console.log(res);
  //         const data = await res.json();
  //         const {fullName, email, role, accessToken} = data.data;
  //         // console.log(fullName, email, role, accessToken);
  //         dispatch(loggedIn(fullName, email, role, accessToken));
  //         toast.success(`Welcome back, ${fullName}`);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   )();
  // }, []);

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
                
              </Route>

              <Route path="users">
                <Route index element={<AdminUsers />} />
                <Route path="create" element={<CreateUserForm/>} />
              </Route>

              <Route path="orders">
                <Route index element={<AdminOrders />} />
                <Route path="manage/:orderId" element={<ManageOrder />} />
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

        <Route path="/checkout/payment" element={<RequireAuth/>}>
          <Route index element={<Payment/>}/>
        </Route>

      </Routes>
    </Suspense>
  );
}


export default App;

