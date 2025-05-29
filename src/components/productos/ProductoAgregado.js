import { useEffect, useState } from "react";
import "./ProductoAgregado.scss";
import { Button, CloseButton } from "react-bootstrap";

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

  const handleClose = () => {
    localStorage.removeItem('productoAgregado');
    setProducto({});
  }

  return (
    <>
    {
      producto ?
        <div className="wide-product-back">
          <CloseButton onClick={handleClose} />
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
            <div className="added-button btn-content">
              <Button variant="primary" className="small" onClick={handleCart}>Ver carrito</Button>
              <Button variant="secondary" className="small" onClick={handleCheckout}>Finalizar Compra</Button>
            </div>
        </div>
      </div>
    :  null
    }
    </>
  )
}