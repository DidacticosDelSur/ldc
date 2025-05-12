import CarouselComp from "../components/Carousel";
import { useEffect, useState } from "react";
import FilterCategories from "../components/FilterCategories";

import "./Home.scss";
import "./Themes.scss";
import CarouselProducto from "../components/CarouselProducto";
import { Col, Container, Image, Row } from "react-bootstrap";
import ProdAnio from "../assets/images/products-of-the-year.svg";
import ProdMes from "../assets/images/products-of-the-month.svg";
import Seguinos from "../assets/images/seguinos.png";
import Novedades from "../assets/images/novedades.png";
import Atencion from "../assets/images/atencion.svg";
import Seguro from "../assets/images/seguro.svg";
import Precio from "../assets/images/precio.svg";
import Envios from "../assets/images/envios.svg";
import { fetchBrandListData } from "../services/BrandServices";
import Microsites from "../components/Microsites";

export default function Home() {
  const [carousel, setCarousel] = useState([
    { id: 1, src: "/assets/images/banners/1/banner-1-desk.png", alt: "" },
    { id: 2, src: "/assets/images/banners/2/banner-2-desk.png", alt: "" },
    { id: 3, src: "/assets/images/banners/3/banner-3-desk.png", alt: "" },
  ]);
  const [ultimos, setUltimos] = useState([]);
  const [destacados, setDestacados] = useState([]);
  const [deAnio, setDeAnio] = useState([]);
  const [marcas, setMarcas] = useState([]);

  useEffect(()=>{
    fetchBrandListData()
      .then(data => {
        setMarcas(data.marcas);
      })
      .catch(err => {
        console.log(err);
      })
    /* fetchProductByTag(2)
      .then(data => {
        setUltimos(data);
      })
      .catch(err => {
        console.log(err);
      })
    fetchProductByTag(3)
      .then(data => {
        setDeAnio(data);
      })
      .catch(err => {
        console.log(err);
      })
    fetchProductByTag(3)
      .then(data => {
        setDestacados(data);
      })
      .catch(err => {
        console.log(err);
      })*/
  }, []) 

  return (
    <>
      <div className="home">
        <CarouselComp list={carousel} />
        <div className="theme-background"></div>
      </div>
      <div className="content">
        <FilterCategories />
      </div>
        <div className="content-carousels">
          <Microsites items={marcas} />
        </div>
      <div className="content">

        <div className="content-carousels">
          <div className="header">
            <h4>Últimos ingresos</h4>
          </div>
          <div className="sliders">
            <CarouselProducto productos={ultimos} cant="4"/>
          </div>
        </div>
        <Container className="carousel-products">
          <Row>
            <Col lg={6}>
              <div className="content-carousels">
                <div className="header">
                  <Image
                    className="d-block"
                    loading="lazy"
                    src={ProdAnio}
                    alt="First slide"
                  />
                  <h4>Productos del Año</h4>
                </div>
                <div className="sliders">
                  <div className="confetti"></div>
                  <CarouselProducto size="small" cant="2" productos={deAnio}/>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="content-carousels">
                <div className="header">
                  <Image
                    className="d-block"
                    loading="lazy"
                    src={ProdMes}
                    alt="First slide"
                  />
                  <h4>Destacados del Mes</h4>
                </div>
                <div className="sliders">
                  <CarouselProducto productos={destacados} size="small"  cant="2"/>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="follow-us">
          <a
            className="follow-wrapper complementary"
            href="https://instagram.com/libdelcolegio"
            target="_blank"
            rel="noreferrer"
          >
            <div className="hashtag">#instagram</div>
            <div className="text">Entérate de todo en nuestras redes!</div>
            <div className="title medium">Seguinos</div>
            <div className="button-follow">Seguinos</div>
            <Image
              className="seguinos"
              loading="lazy"
              src={Seguinos}
              alt="Seguinos"
            />
            {/* <img
              className="seguinos"
              loading="lazy"
              src="{base_url}assets/images/seguinos.png"
              alt="Seguinos"
            /> */}
          </a>
          <a
            className="follow-wrapper primary"
            href="{base_url}tags/1-novedades"
          >
            <div className="hashtag secondary-font">#novedades</div>
            <div className="text">Enterate de las últimas tendencias</div>
            <div className="title medium secondary-font">Novedades</div>
            <div className="button-follow">Ver productos</div>
            <Image
              className="novelty"
              loading="lazy"
              src={Novedades}
              alt="Novedades"
            />
            {/* <img
              className="novelty"
              loading="lazy"
              src="{base_url}assets/images/novedades.png"
              alt="Novedades"
            />*/}
          </a>
        </div>
      </div>
      <div className="info-content">
        <div className="info-home">
          <div className="module icon-1">
            <Image src={Envios} loading="lazy" alt="ENVÍOS A TODO EL PAÍS" />
            {/* <img
              loading="lazy"
              src="{base_url}assets/images/envios.svg"
              alt="ENVÍOS A TODO EL PAÍS"
            /> */}
            <h5>ENVÍOS A TODO EL PAÍS</h5>
            <p>Gratis en Bahía Blanca y zona de influencia.</p>
          </div>

          <div className="module icon-2">
            <Image src={Seguro} loading="lazy" alt="SITIO 100% SEGURO" />
            {/* <img
              loading="lazy"
              src="{base_url}assets/images/seguro.svg"
              alt="SITIO 100% SEGURO"
            /> */}
            <h5>SITIO 100% SEGURO</h5>
            <p>Realiza tu pedido de forma segura.</p>
          </div>

          <div className="module icon-3">
            <Image src={Precio} loading="lazy" alt="EL MEJOR PRECIO" />
            {/* <img
              loading="lazy"
              src="{base_url}assets/images/precio.svg"
              alt="EL MEJOR PRECIO"
            /> */}
            <h5>EL MEJOR PRECIO</h5>
            <p>Los productos más vendidos al mejor precio del mercado.</p>
          </div>

          <div className="module icon-4">
            <Image src={Atencion} loading="lazy" alt="ATENCIÓN PERSONALIZADA" />
            {/* <img
              loading="lazy"
              src="{base_url}assets/images/atencion.svg"
              alt="ATENCIÓN PERSONALIZADA"
            /> */}
            <h5>ATENCIÓN PERSONALIZADA</h5>
            <p>Te esperamos en nuestro showroom de 9 a 18hs.</p>
          </div>
        </div>
      </div>
    </>
  );
}
