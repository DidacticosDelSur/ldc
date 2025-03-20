import { Component } from "react";
import "./ProductosComponent.scss";
import ProductoMini from "./ProductoMini";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { Cart } from "react-bootstrap-icons";

class ProductosComponent extends Component {
  render() {
    return (
      <section className="productsItems">
        {this.props.viewType !== "list" && (
          <div className={this.props.viewType === "grid" ? "grid-view" : "list-view"}>
            {this.props.productos &&
              this.props.productos.map((item) => <ProductoMini key={`producto_${item.id}`} producto={item} authenticated={this.props.authenticated}/>)}
          </div>
        )}
        {this.props.viewType === "list" && (
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
                {this.props.productos &&
                  this.props.productos.map((item) => {
                    const lastChar = item.nombre[item.nombre.length - 1];
                    let nombre = '';
                    if (lastChar == ' ') {
                      nombre = item.nombre[item.nombre.length -1].replace(/ /g, "_")
                    } else {
                      nombre = item.nombre.replace(/ /g, "_")
                    }
                    return ( <tr key={`producto_${item.id}`}>
                      <th>{item.sku}</th>
                      <th>{item.nombre}</th>
                      <th className="unVenta">{item.minimo_compra}</th>
                      <th>{this.props.authenticated ? item.precio : <Link to={`/login`}>Inicia Sesión</Link>}</th>
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
}

export default ProductosComponent;
