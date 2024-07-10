import ProductList from '../components/ProductList.jsx'
import Slider from '../components/Slider.jsx'
import { Toaster } from 'react-hot-toast'
function Home() {
  // organize the home page with the hero section, banners and a list of products.
  return (
    <div>
      <Slider/>
      {/* <h1>Hero Section</h1> */}
      <div className='border rounded p-3 mt-3'>
        <h1 className='text-3xl tracking-widest my-2 ' >LATEST PRODUCTS</h1>
        <ProductList />
      </div>
      <Toaster/>
    </div>
  )
}

export default Home