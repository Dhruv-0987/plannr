import React from "react";
import Slider from "react-slick";
import { ArrowRight } from "@mui/icons-material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function Carousal() {
  const bannerImage = require("./bannerlogo.jpeg");

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div className="w-full h-1/2">
      <Slider {...settings} className="w-full">
        <div className="relative w-full h-[45vh]">
          <img
            src={bannerImage}
            className="w-full h-full object-cover opacity-70"
          />
          <div
            className="absolute text-center w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            p-6 rounded-lg  "
          >
            <p className="text-6xl text-brand-green italic font-playfair">
            A tailored grocery list, designed by you
            </p>
            <h2 className=" text-3xl tracking-wider m-6 mt-10 font-pacifico  text-brand-green font-lato">
              M Y L L L
            </h2>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default Carousal;
