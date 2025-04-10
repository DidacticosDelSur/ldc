import { useContext, useEffect, useState } from "react";

import "./ProductSmall.scss";
import { Link } from "react-router-dom";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";
import { AuthContext } from "../../services/AuthContext";

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
            <div className="categ">{product.marca}</div>
            <div className="name">{product.nombre}</div>
            {isAuthenticated &&
              <div className="price price-wrapper Escolar">
                <div>
                  <span className="price price-discount-0 price-discount-Escolar">
                    <span className="tipo tipo-Libro">PVP </span>
                    <span className="original-price tipo-Libro">
                      {formatCurrency(product.pvp)}
                    </span>
                    <span className="discount">
                      {product.descuento}% off
                    </span>
                  </span>
                </div>
                <div>
                  {formatCurrency(product.precio)}
                </div>
              </div>
            }
            {!isAuthenticated && <div>Ingrese para ver los precios</div>}
          </div>
        </Link>
      </div>
    </>
  );
}

