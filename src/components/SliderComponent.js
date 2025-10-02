import Slider from "react-slick";
import "./SliderComponent.scss";
import { useEffect, useState } from "react";
import videoIcon from '../assets/images/video-icon.png'
import useFancybox from "../hooks/useFancybox";

export default function SliderComponent ({images, video = null}) {
  const [settings, setSettings] =useState({});
  const [fancyboxRef] = useFancybox({})

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
      infinite: false,
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
            ?  <Slider {...settings} ref={fancyboxRef}>
                <a
                  data-fancybox="gallery"
                  data-src={images[0].preview}
                >
                  <img className="hover-zoom" src={images[0].preview} alt={images[0].alt} />
                </a>
                <>
                  <a data-fancybox="gallery" href="#video">
                    <div  dangerouslySetInnerHTML={{ __html: video }}></div>
                  </a>
                  <div style={{ display: "none" }}>
                    <div id="video">
                      <div  dangerouslySetInnerHTML={{ __html: video }}></div>
                    </div>
                  </div>
                </>
              </Slider>
            : <div ref={fancyboxRef} >
                <a
                  data-fancybox
                  data-src={images[0].preview}
                  className="slick-slider carousel-prod-amp"
                >
                  <img className="hover-zoom" src={images[0].preview} alt={images[0].alt} />
                </a>
              </div>
          : 
          <Slider {...settings} ref={fancyboxRef}>
            {images.map((item) => {
              return (
                <a key={`media_${item.id}`}
                  data-fancybox="gallery"
                  data-src={item.preview}
                >
                  <img className="hover-zoom" src={item.preview} alt={item.alt} />
                </a>
              )
            })}
            {video
              ? <>
                  <a data-fancybox="gallery" href="#video">
                    <div  dangerouslySetInnerHTML={{ __html: video }}></div>
                  </a>
                  <div style={{ display: "none" }}>
                    <div id="video">
                      <div  dangerouslySetInnerHTML={{ __html: video }}></div>
                    </div>
                  </div>
                </>
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