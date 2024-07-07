import { useState } from "react";
import {
  FaBoxOpen,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaUserCircle,
  FaUserLock
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

const user = { id: "abcd", role: "admin" };

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dialog = (
    <dialog
      open={isOpen}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className="border rounded-md shadow-lg absolute sm:top-12 top-20 sm:-left-[34px] -left-20 py-4 px-6 w-32"
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
        <Link to="/profile">
          <p className="flex flex-row justify-start items-center gap-3 header-dialog-link">
            <FaUserCircle />
            Profile
          </p>
        </Link>
        <Link to="/orders">
          <p className="flex flex-row justify-start items-center gap-3 header-dialog-link">
            <FaBoxOpen />
            Orders
          </p>
        </Link>
        <button>
          <p className="flex flex-row justify-start items-center gap-3 header-dialog-link">
            <FaSignOutAlt /> Logout
          </p>
        </button>
      </div>
    </dialog>
  );

  const navigate = useNavigate();
  
  function onSearch(){
    navigate('/product-search');
  }

  return (
    <header className="bg-white sticky top-0 z-10 w-full shadow-md">
      <nav className="flex items-center justify-between py-0.5 w-full">
        <div className="flex sm:flex-row flex-col w-full sm:w-7/12 gap-3 justify-evenly sm:items-center items-start">
          <span className="sm:text-5xl text-3xl ml-3">
            <Link to="/">Logo</Link>
          </span>
          <SearchBar onSearch={onSearch}/>
        </div>

        <div className="h-full flex flex-col-reverse sm:flex-row justify-center items-center gap-5 sm:gap-8 py-1 px-3 sm:px-2 relative mr-2">
          {user.id ? (
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
            <span className="p-1 sm:p-3 sm:text-xl">
              <Link to="/login">
                <FaSignInAlt />
              </Link>
            </span>
          )}

          <span className="p-1 sm:p-3 sm:text-xl ">
            <Link to="/cart">
              <FaShoppingBag />
            </Link>
          </span>
        </div>

        {/* <button className="sm:hidden inline cursor-pointer">
          <FaCaretDown />
        </button> */}
      </nav>
    </header>
  );
}

export default Header;
