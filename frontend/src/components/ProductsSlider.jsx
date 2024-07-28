import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard.jsx";
import { useGetProductsQuery } from "../features/products/productsApiSlice.js";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "../index.css";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`arrow-next ${className}`} onClick={onClick} style={style}>
      <span><AiOutlineArrowRight className="pos-center" style={{display:'inline', color:'white', fontSize: '25'}} /></span>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={`arrow-prev ${className}`} onClick={onClick} style={style}>
      <span><AiOutlineArrowLeft className="pos-center" style={{color:'white', fontSize: '25'}} /></span>
    </div>
  );
}

function ProductsSlider({ category }) {
  const { data, isLoading, isFetching, isError, error } =
    useGetProductsQuery(category);
  let products = data?.data || [];
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow/>,
    prevArrow: <PrevArrow />
  };
  // if(data){

  // }

  if (isLoading) return <h1>Loading...</h1>;
  else if (isError) return <h1>Error...</h1>;
  console.log(products);
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {products?.map((product) => (
          <div key={product._id} className="p-6 ml-4">
            <ProductCard product={product} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ProductsSlider;
