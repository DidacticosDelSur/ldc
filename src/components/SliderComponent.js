import Slider from "react-slick";
import "./SliderComponent.scss";
import { useEffect, useState } from "react";



export default function SliderComponent ({images}) {
  const [settings, setSettings] =useState({});
  useEffect(()=>{
    setSettings({
      ...settings,
      customPaging: function(i) {
        return (
          <a>
            <img src={`${images[i].preview}`}/>
          </a>
        );
      },
      dots: true,
      className: "carousel-prod-amp items-content",
      dotsClass: "slick-thumb",
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false
    })
  },[images])

  return (
    <>
    {
      images.length > 0 ?
      <div className="slider-container">
        { images.length == 1 ?
          <div className="slick-slider carousel-prod-amp">
            <img src={images[0].preview} alt={images[0].alt} />
          </div>
          :
          <Slider {...settings}>
            {images.map((item) => {
              return (
                <div key={`media_${item.id}`}>
                  <img src={item.preview} alt={item.alt} />
                </div>
              )
            })}
          </Slider>
        }
      </div>
      : null
    }
   </>
  )


}