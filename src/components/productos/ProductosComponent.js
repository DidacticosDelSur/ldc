import { Component } from "react";
import "./ProductosComponent.scss";
import ProductoMini from "./ProductoMini";
import Table from "react-bootstrap/Table";

class ProductosComponent extends Component {
  render() {
    return (
      <section className="productsItems">
        {this.props.viewType !== "list" && (
          <div className={this.props.viewType === "grid" ? "grid-view" : "list-view"}>
            {this.props.productos &&
              this.props.productos.map((item) => <ProductoMini key={`producto_${item.id}`} producto={item} />)}
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
                </tr>
              </thead>
              <tbody>
                {this.props.productos &&
                  this.props.productos.map((item) => (
                    <tr key={`producto_${item.id}`}>
                      <th>{item.sku}</th>
                      <th>{item.nombre}</th>
                      <th className="unVenta">{item.uniVta}</th>
                      <th>{item.precio}</th>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        )}
      </section>
    )
  }
}

export default ProductosComponent;
