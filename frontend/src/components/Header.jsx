import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaBoxOpen,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaUserLock,
} from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../features/auth/authApiSlice.js";
import { loggedOut } from "../features/auth/authSlice.js";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const user = useSelector((state) => state.auth);
  // console.log('current user auth state ',user);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      const res = await logout();
      console.log("loggedOut ", res);
      toast.success("Logged out");

      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loggedOut());
    }
  };

  const dialog = (
    <dialog
      open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="border rounded-md shadow-lg absolute sm:top-12 top-20 sm:left-[165px] -left-20 py-4 px-6 w-32"
    >
      <div className="flex flex-col justify-center items-start gap-5">
        {user.role === "admin" && (
          <Link to="/admin/dashboard/insights">
            <p className="flex justify-between items-center gap-3 header-dialog-link">
              <FaUserLock />
              Admin
            </p>
          </Link>
        )}
        <Link to="/profile" onClick={() => setIsOpen(false)}>
          <p className="flex flex-row justify-start items-center gap-3 header-dialog-link">
            <FaUserCircle />
            Profile
          </p>
        </Link>
        <Link to="/orders" onClick={() => setIsOpen(false)}>
          <p className="flex flex-row justify-start items-center gap-3 header-dialog-link">
            <FaBoxOpen />
            Orders
          </p>
        </Link>
        <button onClick={handleLogOut}>
          <p className="flex flex-row justify-start items-center gap-3 header-dialog-link">
            <FaSignOutAlt /> Logout
          </p>
        </button>
      </div>
    </dialog>
  );

  function onSearch() {
    navigate("/products");
  }

  return (
    <header className="bg-white header sticky top-0 z-10 w-full shadow-md">
      <nav className="flex items-center justify-between py-0.5 w-full">
        {/* <div className="flex sm:flex-row flex-col w-full sm:w-7/12 gap-3 justify-between sm:items-center items-start"> */}
        <span className="sm:text-5xl text-3xl ml-3">
          <Link to="/">Logo</Link>
        </span>

        {/* {location.pathname !== "/products" && (
            <p className="w-full">
              <SearchBar onSearch={onSearch} />
            </p>
          )} */}
        {/* </div> */}

        <div className="h-full flex flex-col-reverse sm:flex-row justify-center items-center gap-5 sm:gap-8 py-1 px-3 sm:px-2 relative mr-2">
          <Link to={"/products"} style={{visibility: location.pathname==='/products'&&'hidden'}}>
            <p className="flex justify-center items-center gap-1.5 header-dialog-link mt-0.5">
              <FaSearch />{" "}
              <span className="text-lg">Browse collections</span>
            </p>
          </Link>
          {user.accessToken ? (
            <>
              <button
                className="p-1 sm:p-3 sm:text-xl"
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
              >
                <FaUser />
              </button>
              {dialog}
            </>
          ) : (
            <Link to="/login">
              <span className="p-1 sm:p-3 sm:text-xl flex items-center gap-2 header-dialog-link">
                Login
                <FaSignInAlt />
              </span>
            </Link>
          )}

          <span className="p-1 sm:p-3 sm:text-2xl ">
            <Link to="/cart">
              <MdShoppingCart />
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Header;
