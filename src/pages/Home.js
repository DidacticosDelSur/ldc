import CarouselComp from "../components/Carousel";
import { useContext, useEffect, useState } from "react";

import "./Home.scss";
import "./Themes.scss";
import { Image } from "react-bootstrap";
import Seguinos from "../assets/images/seguinos.png";
import Novedades from "../assets/images/novedades.png";
import Atencion from "../assets/images/atencion.svg";
import Seguro from "../assets/images/seguro.svg";
import Precio from "../assets/images/precio.svg";
import Envios from "../assets/images/envios.svg";
import { fetchBrandListData } from "../services/BrandServices";
import Microsites from "../components/Microsites";
import { fetchCarouselListData } from "../services/CarouselServices";
import HashtagComponent from "../components/HashtagCmponent";
import Carousel from "../components/Carousel";
import { GlobalFunctionsContext } from "../services/GlobalFunctionsContext";
import { fetchTagList } from "../services/TagServices";

export default function Home() {
  const { convertStringToLink } = useContext(GlobalFunctionsContext);
  const [carousel, setCarousel] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [marcasLogos, setMarcasLogos] = useState([]);
  const [tags, setTags] = useState([])

  useEffect(()=>{
    window.scrollTo(0, 0);
    fetchBrandListData({'microsite':1})
      .then(data => {
        setMarcas(data.marcas);
      })
      .catch(err => {
        console.log(err);
      })
    fetchBrandListData()
      .then(data => {
        const marcasConUrls = data.marcas.map((item) => ({
          img: item.logoUrl,
          url: `marca/${item.id}-${convertStringToLink(item.nombre)}`,
        }));
        setMarcasLogos(marcasConUrls);
      })
      .catch(err => {
        console.log(err);
      })
    fetchTagList({'home':1})
    .then((data)=>{
      setTags(data.tags);
    })
    .catch(err => {
      console.log(err)
    })
    fetchCarouselListData()
      .then(data => {
        setCarousel(data.carousel);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <>
      <div className="home content">
        <CarouselComp items={carousel} slidesToShow={1} />
       {/*  <div className="theme-background"></div> */}
      </div>
      <div className="content">
        {/* <FilterCategories /> */}
        {tags.length > 0 &&
          tags.map((item)=>{
            return <HashtagComponent
                    key={`tags_${item.id}`}
                    hashtag={item.id}
                    title={item.nombre}
                    size={item.inside ? `small` : `big`}
                    color={item.color}
                    subtitle={item.descripcion}/>
          })
        }
      </div>
      {marcas.length > 0 &&
        <div className="content-carousels background-grey">
          <Microsites items={marcas} />
        </div>
      }
      <div className="content">
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
          </a>
          <a
            className="follow-wrapper primary"
            href="#/tags/1-Novedades"
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
          </a>
        </div>
      </div>
      <div className="info-content backgroud-grey">
        <h2>Marcas que trabajamos</h2>
        <Carousel items={marcasLogos} slidesToShow={7} isLogo={true}/>
      </div>
      <div className="info-content">
        <div className="info-home">
          <div className="modulo">
            <Image src={Envios} loading="lazy" alt="ENVÍOS A TODO EL PAÍS" />
            <div className="inner-modulo">
              <div className="title">ENVÍOS A TODO EL PAÍS</div>
              <p>Gratis en Bahía Blanca y zona de influencia.</p>
            </div>
          </div>

          <div className="modulo">
            <Image src={Seguro} loading="lazy" alt="SITIO 100% SEGURO" />
            <div className="inner-modulo">
              <div className="title">SITIO 100% SEGURO</div>
              <p>Realiza tu pedido de forma segura.</p>
            </div>
          </div>

          <div className="modulo">
            <Image src={Precio} loading="lazy" alt="EL MEJOR PRECIO" />
            <div className="inner-modulo">
              <div className="title">EL MEJOR PRECIO</div>
              <p>Los productos más vendidos al mejor precio del mercado.</p>
            </div>
          </div>

          <div className="modulo">
            <Image src={Atencion} loading="lazy" alt="ATENCIÓN PERSONALIZADA" />
            <div className="inner-modulo">
              <div className="title">ATENCIÓN PERSONALIZADA</div>
              <p>Te esperamos en nuestro showroom de 9 a 18hs.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
