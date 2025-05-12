import React, { useEffect, useRef, useState } from 'react';
import './InfiniteCarousel.css'; // lo verás abajo

const InfiniteCarousel = ({ images, speed = 3000 }) => {
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const itemsToShow = 3;

  // Auto-avance
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, speed);
    return () => clearInterval(interval);
  }, [index]);

  const scrollToIndex = (i) => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.my-carousel-item');
    const total = items.length;
    const realIndex = i % (total / 2); // porque duplicamos imágenes
    const nextItem = items[realIndex];

    if (nextItem) {
      container.scrollTo({
        left: nextItem.offsetLeft,
        behavior: 'smooth',
      });
    }
  };

  const next = () => {
    setIndex((prev) => prev + itemsToShow);
  };

  const prev = () => {
    setIndex((prev) => Math.max(0, prev - itemsToShow));
  };

  // Scroll visual cuando cambia el índice
  useEffect(() => {
    scrollToIndex(index);
  }, [index]);

  return (
    <>
    <button className="carousel-button left" onClick={prev}>‹</button>
    <div className="carousel-wrapper">
      <div className="carousel-container" ref={containerRef}>
        {[...images, ...images].map((img, i) => (
          <div key={i} className="ms-carousel-item">
              <img src={img} alt={`img-${i}`} />
              <img className="logo" src={img} alt={`logo-${i}`} />
              <div className='carousel-item-inner'>
              </div>
          </div>
        ))}
      </div>
    </div>
    <button className="carousel-button right" onClick={next}>›</button>
    </>
  );
};

export default InfiniteCarousel;
