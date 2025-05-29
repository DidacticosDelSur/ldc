import { useContext, useEffect, useState } from "react";

import "./ProductSmall.scss";
import { Link } from "react-router-dom";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";
import { AuthContext } from "../../services/AuthContext";
import { Button } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";

export default function ProductSmall ({product}) {
  const { formatCurrency, convertStringToLink } = useContext(GlobalFunctionsContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [nameLink, setNameLink] = useState('');

  useEffect(()=>{
    setNameLink(convertStringToLink(product.nombre));
  },[product])

  return (
    <>
      <div className={"card " +( product.inCart ? 'in-cart' : '')} >
      <Link to={`/producto/${product.id}-${nameLink}`} className="producto">
          <div className="image">
            <img
              loading="lazy"
              src={product.preview}
              alt={product.nombre}
            />
          </div>
          <div className="description ">
            <div className="categ">
              <div className="brand">{product.marca}</div>
              <div className="sku">sku: {product.sku}</div>
            </div>
            <div className="descrition-data">
            <div className="name">{product.nombre}</div>
              {isAuthenticated &&
                <div className="price">
                  <span className="sign">$</span>
                    {product.descuento > 0 
                    ? formatCurrency(product.precio*(1-product.descuento/100))
                    :<>{formatCurrency(product.precio)}<span>+ iva</span></>
                  }
                  {product.descuento > 0 &&
                  <span className="descuento">{formatCurrency(product.precio)}</span>
                }
                </div>
              }
            </div>
            {!isAuthenticated 
              ? <div>Ingrese para ver los precios</div>
              : <div className="btn-content">
                <Button variant="primary" className="small">Agregar al carrito <Cart /></Button>
                </div>
            }
          </div>
        </Link>
      </div>
    </>
  );
}

