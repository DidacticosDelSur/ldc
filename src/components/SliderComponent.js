import Slider from "react-slick";
import "./SliderComponent.scss";
import { useEffect, useState } from "react";
import videoIcon from '../assets/images/video-icon.png'

export default function SliderComponent ({images, video = null}) {
  const [settings, setSettings] =useState({});
  useEffect(()=>{
    setSettings({
      ...settings,
      customPaging: function(i) {
        return (
          <a>
            {images[i] 
              ? <img src={`${images[i].preview}`} />
              : <img src={videoIcon} />
            }
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
          video 
            ?  <Slider {...settings}>
                  <div>
                    <img src={images[0].preview} alt={images[0].alt} />
                  </div>
                  <div>
                    <div  dangerouslySetInnerHTML={{ __html: video }}></div>
                  </div>
                </Slider>
            :  <div className="slick-slider carousel-prod-amp">
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
            {video
              ? <div>
                  <div  dangerouslySetInnerHTML={{ __html: video }}></div>
                </div>
              : null
            }
          </Slider>
        }
      </div>
      : null
    }
   </>
  )


}