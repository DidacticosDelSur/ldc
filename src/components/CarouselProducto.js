import React, { useContext } from "react";
import Slider from "react-slick";
import { productData } from "../assets/dataCarousel";
import ProductSmall from "./productos/ProductSmall";
import { AuthContext } from "../services/AuthContext";

function CarouselProducto(props) {
  const { isAuthenticated } = useContext(AuthContext);
  
  const cantidad = parseInt(props.cant);
  const break920 = parseInt(props.cant) > 3 ? 3 : parseInt(props.cant);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: cantidad,
    slidesToScroll: cantidad,
    responsive: [
      {
        breakpoint: 930,
        settings: {
          className: "rows_"+break920,
          slidesToShow: break920,
          slidesToScroll: break920,
          infinite: true
        }
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true
        }
      }
    ]
  };
  return (
    <div className="slider-container product-slide">
      <Slider {...settings}>
        {
          productData.map((item) => { return (<div key={`carouselProd_${item.id}`}><ProductSmall product={item}/></div>)})
        }
      </Slider>
    </div>
  );
}

export default CarouselProducto;