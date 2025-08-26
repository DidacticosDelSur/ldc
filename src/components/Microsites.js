import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalFunctionsContext } from "../services/GlobalFunctionsContext";
import './Microsites.scss';
import { ArrowRightIcon } from "lucide-react";

export default function Microsites({items, speed = 300000}) {
  const { convertStringToLink } = useContext(GlobalFunctionsContext);
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
  
    const items = container.querySelectorAll('.ms-container-items');
    const total = items.length;
  
    const realIndex = i % (total / 2); // porque duplicamos imágenes
  
    if (items.length === 0) return;
  
    const itemWidth = items[0].offsetWidth; // ancho real del ítem (sin gap)
    const gap = 10; // en píxeles, debe coincidir con el usado en CSS
  
    const scrollLeft = realIndex * (itemWidth + gap);
  
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });
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
      {items.length > 0
        ? <div className="ms">
            <div className="ms-header">
              <div className="ms-title">Micrositios por marca</div>
              <div className="ms-subtitle">Trabajamos con las mejores marcas del mercado. Siempre disponemos de stock y al mejor precio.</div>
            </div>
            <>
            <div className="ms-wrapper">
              <button className="ms-button left" onClick={prev}>‹</button>
              <div className="ms-container content" ref={containerRef}>
                {[...items, ...items].map((item, i) => {
                const brandName = convertStringToLink(item.nombre)
                return (
                  <div className="ms-container-items">
                    <div className="ms-background">
                      <img src={item.bannerUrl} alt={`imgBanner-${i}`} />
                    </div>
                    <div className="ms-logo">
                      <img src={item.logoUrl} alt={`imgLogo-${i}`} />
                    </div>
                    <div className="ms-items">
                      {item.products.map((prod) => {
                        let prodName = convertStringToLink(prod.nombre)
                        return (<Link className="ms-item" to={`producto/${prod.id}-${prodName}`}>
                          <img src={prod.imgUrl} />
                        </Link>)
                        }
                      )}
                    </div>
                    <div className="ms-action btn-content">
                      <Link className="btn btn-dark small" to={`/marca/${item.id}-${brandName}`}>Visitar micrositio <ArrowRightIcon /></Link>
                    </div>
                  </div>
                  )})}
                </div>
                <button className="ms-button right" onClick={next}>›</button>
              </div>
            </>
          </div>
        : null
      }
    </>
  )
}