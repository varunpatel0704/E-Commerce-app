import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
function Layout() {
  return (
    <main className="">
      <Header />
      <div className="h-section w-full p-4"> 
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default Layout;
