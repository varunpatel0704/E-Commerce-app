import ProductList from "../components/ProductList.jsx";
import Slider from "../components/Slider.jsx";
import { Toaster } from "react-hot-toast";

//remove product list and add a carousel for latest and trending categories.  

function Home() {
  // organize the home page with the hero section, banners and a list of products.
  
  return (
    <div>
      <Slider />
      {/* <h1>Hero Section</h1> */}
      <div className="border rounded p-3 mt-3">
        <h1 className="text-3xl tracking-widest my-2 ">LATEST PRODUCTS</h1>
        <div className="flex justify-start items-center flex-wrap gap-10">
          <ProductList category="latest" />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
