import React from "react";
import Slider from "react-slick";
import { ArrowRight } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';

function Carousal() {
  
  const navigate = useNavigate();
  const bannerImage = require("./bannerlogo.jpeg")

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  const handleRightArrowClick = () => {
    navigate('/suggestions')
  }

  return (
    <div className="w-full h-1/2">
      <Slider {...settings} className="w-full">
        <div className="relative w-full h-[50vh]">
          <img
            src={bannerImage}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute text-center w-1/2 h-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          p-6 rounded-lg  "
          >
          <p className="text-8xl text-brand-green italic font-playfair">Plannr</p>
            <h2 className=" text-3xl tracking-wider m-6 mt-10 font-pacifico italic text-brand-green font-lato">
             Tailored Healthy grocery list just for you
            </h2>
          </div>
        </div>
        
      </Slider>
    </div>
  );
}

export default Carousal;
