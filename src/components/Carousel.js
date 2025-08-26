import React from "react";
import Slider from "react-slick";
import "./Carousel.scss";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

export default function Carousel({items, slidesToShow, isLogo}) {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
  };
  return (
    <div className="container slider-container carousel-container">
      <div className={`slider carousel ${isLogo ? 'logo-type' : ''}`}
        style={{
          width: "100%"
        }}
      >
        {items.length ==+ 1
          ? <div class="slick-list">
              <div class="slick-track" style={{ opacity: 1, transform: 'translate3d(0px, 0px, 0px)'}}>
                <div data-index="0" class="slick-slide slick-active slick-current" tabindex="-1" aria-hidden="false" style={{ display:'inline-block', outline: 'none', width: '1206px' }}>
                  <div tabindex="-1" style={{width: '100%', display: 'inline-block' }}>
                    <Link to={`/${items[0].url}`} style={{display: 'block', maxHeight: '415px'}}>
                        {!isMobile && <img src={items[0].img} alt=""/>}
                        {isMobile && <img src={items[0].imgUrlMobile} alt=""/>}
                        </Link>
                  </div>
                </div>
              </div>
            </div>
          : <Slider {...settings}>
              {items.map((item)=>{
                      return (
                        <div key={`carousel_${item.id}`}>
                          <Link to={`/${item.url}`}>
                          {!isMobile && <img src={item.img} alt=""/>}
                          {isMobile && <img src={item.imgUrlMobile} alt=""/>}
                          </Link>
                        </div>
                      );
                    })}
              </Slider>
          }
        </div>
    </div>
  );
}