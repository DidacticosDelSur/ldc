import Slider from "react-slick";
import "./SliderComponent.scss";

const settings = {
  /* customPaging: function(i) {
    return (
      <a>
        <img src={`${baseUrl}/abstract0${i + 1}.jpg`}/>
      </a>
    );
  }, */
  dots: true,
  className: "carousel-prod-amp",
  /*dotsClass: "slick-dots slick-thumb",  */
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export default function SliderComponent ({images}) {
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