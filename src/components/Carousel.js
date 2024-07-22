import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { data } from "../assets/data";

import "./Carousel.scss";

const CarouselComp = () => {
  const listRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const listNode = listRef.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];
    const timeout = setTimeout(() => {
      scrollToImage("next");
    }, 5000);

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  const scrollToImage = (direction) => {
    if (direction === "prev") {
      setCurrentIndex((curr) => {
        const isFirstSlide = currentIndex === 0;
        return isFirstSlide ? data.length - 1 : curr - 1;
      });
    } else {
      setCurrentIndex((curr) => {
        const isLastSlide = currentIndex === data.length - 1;
        return isLastSlide ? 0 : curr + 1;
      });
    }
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const renderContent = (item) => {
    if (isMobile) {
      return <img src={item.imgUrlMobile} width={500} height={496} />;
    }
    return <img src={item.imgUrl} width={1660} height={496} />;
  };

  return (
    <>
      <div className="main-container">
        <div className="slider-container">
          <div
            className="arrow leftArrow"
            onClick={() => scrollToImage("prev")}
          >
            &#10092;
          </div>
          <div
            className="arrow rightArrow"
            onClick={() => scrollToImage("next")}
          >
            &#10093;
          </div>
          <div className="container-images">
            <ul ref={listRef}>
              {data.map((item) => {
                return <li key={item.id}>{renderContent(item)}</li>;
              })}
            </ul>
          </div>
          <div className="dots-container">
            {data.map((_, idx) => (
              <div
                key={idx}
                className={`dot-container-item ${
                  idx === currentIndex ? "active" : ""
                }`}
                onClick={() => goToSlide(idx)}
              >
                <span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CarouselComp;
