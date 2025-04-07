import { useEffect, useState } from "react";
import "./ProductoAgregado.scss";

export default function ProductoAgregado() {
  const [producto, setProducto] = useState({});

  useEffect(() => {
    const prod = JSON.parse(localStorage.getItem('productoAgregado'));
    setProducto(prod);
  }, [localStorage.getItem('productoAgregado')]);

  const handleCart = () => {
    localStorage.removeItem('productoAgregado');
    window.location.href = '#/carrito';
  };

  const handleCheckout = () => {
    localStorage.removeItem('productoAgregado');
    window.location.href = '#/checkout';
  };

  return (
    <>
    {
      producto ?
        <div className="wide-product-back">
          <div className="wide-content">
          <div className="product-added">
            <div className="added-div">
              <div className="added-img">
                <img loading="lazy" src={producto.img} alt="imagen producto agregado" />
              </div>
              <div className="added-info">
                <span>Agregado al carrito</span>
                <span>{producto.nombre}</span>
              </div>
            </div>
            <div className="added-button">
              <button onClick={handleCart}>Ver carrito</button>
              <button onClick={handleCheckout}>Finalizar Compra</button>
            </div>
          </div>
        </div>
      </div>
    :  null
    }
    </>
  )
}