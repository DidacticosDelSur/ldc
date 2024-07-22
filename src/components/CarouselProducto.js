import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  productData,
  responsive,
  responsiveSmall,
} from "../assets/dataCarousel";

import "./CarouselProducto.scss";
import ProductoMini from "./ProductoMini";

export default function CarouselProducto(props) {
  const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
      <button className="slick-next slick-arrow" onClick={() => onClick()} />
    );
  };
  const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
      <button className="slick-prev slick-arrow" onClick={() => onClick()} />
    );
  };
  const product = productData.map((item) => <ProductoMini producto={item} />);
  return (
    <Carousel
      responsive={props.size === "small" ? responsiveSmall : responsive}
      /* itemClass="carousel-item-padding-10-px"*/
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      {product}
    </Carousel>
  );
}
