import HeroSlider from "../components/HeroSlider.jsx";
import ProductsSlider from "../components/ProductsSlider.jsx";


//remove product list and add a carousel for latest and trending categories.  

function Home() {
  // organize the home page with the hero section, banners and a list of products.
  
  return (
    <div>
      <HeroSlider />
      {/* <h1>Hero Section</h1> */}
      <div className="border rounded p-3 mt-8">
        <h1 className="text-3xl tracking-widest my-2 ">LATEST PRODUCTS</h1>
        {/* <div className="flex justify-start items-center flex-wrap gap-10"> */}
        {/* </div> */}
        <div className="h-80" >
          <ProductsSlider category={'games'}/>
        </div>
      </div>

      <div className="border rounded p-3 mt-8">
        <h1 className="text-3xl tracking-widest my-2 ">TRENDING PRODUCTS</h1>
        {/* <div className="flex justify-start items-center flex-wrap gap-10"> */}
        {/* </div> */}
        <div className="h-80" >
          <ProductsSlider category={'trending'}/>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
