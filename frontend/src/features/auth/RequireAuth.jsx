import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Outlet, Navigate } from "react-router-dom";
import { loggedOut } from "./authSlice.js";
import { useEffect } from "react";

function RequireAuth({ adminRoute = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { accessToken, role } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (!accessToken) {
  //     // dispatch(loggedOut());
  //     navigate("/login", { replace: true, state: { from: location } });
  //   }

  //   else if(adminRoute && role!=='admin'){
  //     // dispatch(loggedOut());
  //     navigate("/login", { replace: true, state: { from: location } });
  //   }
  // }, []);
  if (!accessToken)
    return <Navigate to={"/login"} replace state={{ from: location }} />;

  else if (adminRoute && role !== "admin")
    return <Navigate to={"/login"} replace state={{ from: location }} />;
  
  else
    return <Outlet />;
}

export default RequireAuth;
