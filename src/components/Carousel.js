import React from "react";
import Slider from "react-slick";
import { data } from "../assets/data";
import "./Carousel.scss";
import { isMobile } from "react-device-detect";

export default function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container slider-container carousel-container">
      <div className="slider carousel"
        style={{
          width: "98%"
        }}
      >
            <Slider {...settings}>
            {data.map((item)=>{
                    return (
                      <div key={`carousel_${item.id}`}>
                        <a href="/">
                        {!isMobile && <img src={item.imgUrl} alt=""/>}
                        {isMobile && <img src={item.imgUrlMobile} alt=""/>}
                        </a>
                      </div>
                    );
                  })}
            </Slider>
        </div>
    </div>
  );
}