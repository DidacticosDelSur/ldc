import { useContext } from "react";
import "./ProductsComponent.scss";
import ProductSmall from "./ProductSmall";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
import { AuthContext } from "../../services/AuthContext";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";
import { Button } from "react-bootstrap";

export default function ProductsComponent ({viewType, products}) {
  const { isAuthenticated } = useContext(AuthContext);
  const { convertStringToLink, formatCurrency } = useContext(GlobalFunctionsContext);
  const navigate = useNavigate();

  return (
    <>
      {viewType !== "list" && (
        <div className={viewType === "grid" ? "grid-view" : "list-view"}>
          {products &&
            products.map((item) => <ProductSmall key={`producto_${item.id}`} product={item}/>)}
        </div>
      )}
      {viewType === "list" && (
        <div className="table-view">
          <Table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Código</th>
                <th>Venta</th>
                <th>Precio</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((item, index) => {
                  let nombre = convertStringToLink(item.nombre)
                  return ( <tr key={`producto_${item.id}`} >
                    <th style={{
                              backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#EBEBEB',
                            }}>
                      <div className="inner-table">
                        <img
                            loading="lazy"
                            src={item.preview}
                            alt={item.nombre}
                          />
                        {item.nombre}
                      </div>
                    </th>
                    <th style={{
                              backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#EBEBEB',
                            }}>{item.sku}</th>
                    <th className="unVenta" style={{
                              backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#EBEBEB',
                            }}>{item.minimo_compra}</th>
                    <th style={{
                              backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#EBEBEB',
                            }}>{isAuthenticated
                      ? <div className="price"><span>$</span>{formatCurrency(item.precio)}<span>+ iva</span></div>
                      : <>
                          <div className="btn-content">
                            <Button
                              variant="primary"
                              className="small"
                              onClick={()=>{navigate('/login')}}
                            >Inicia Sesión</Button>
                          </div>
                        </>
                      }
                    </th>
                    <th style={{
                              backgroundColor: index % 2 === 0 ? '#FAFAFA' : '#EBEBEB',
                            }}>
                      <div className="btn-content">
                        <Button
                          variant="primary"
                          className="small"
                          onClick={()=>{navigate(`/producto/${item.id}-${nombre}`)}}
                        >
                          {item.inCart
                            ? <span>Seguir Agregando</span>
                            : 'Agregar'
                        }<Cart /></Button>
                      </div>
                    </th>
                  </tr>)
                  }
                )}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}
