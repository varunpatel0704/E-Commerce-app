import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard.jsx";
import { useGetProductsQuery } from "../features/products/productsApiSlice.js";

function HeroSlider() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
  };
  const images = [
    {
      link: "",
      url: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/3b771d66b23f563f.jpeg?q=20",
    },
    {
      link: "",
      url: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/1a7502e2652b70c5.jpeg?q=20",
    },
    {
      link: "",
      url: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/3b771d66b23f563f.jpeg?q=20",
    },
    {
      link: "",
      url: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/3b771d66b23f563f.jpeg?q=20",
    },
  ];

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.url} className="hero-slider w-full">
            <img src={image.url} className="hero-slider-img" />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroSlider
