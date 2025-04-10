import { useContext } from "react";
import "./ProductsComponent.scss";
import ProductSmall from "./ProductSmall";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";
import { AuthContext } from "../../services/AuthContext";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";

export default function ProductsComponent ({viewType, products}) {
  const { isAuthenticated } = useContext(AuthContext);
  const { convertStringToLink } = useContext(GlobalFunctionsContext);

  return (
    <section className="productsItems">
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
                <th>Código</th>
                <th>Nombre</th>
                <th>Uni. Venta</th>
                <th>Precio</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((item) => {
                  let nombre = convertStringToLink(item.nombre)
                  return ( <tr key={`producto_${item.id}`}>
                    <th>{item.sku}</th>
                    <th>{item.nombre}</th>
                    <th className="unVenta">{item.minimo_compra}</th>
                    <th>{isAuthenticated ? item.precio : <Link to={`/login`}>Inicia Sesión</Link>}</th>
                    <th> <Link to={`/producto/${item.id}-${nombre}`}>Ver Producto</Link></th>
                    {item.inCart && <th><Cart /></th>}
                    </tr>)
                  }
                )}
            </tbody>
          </Table>
        </div>
      )}
    </section>
  )
}
