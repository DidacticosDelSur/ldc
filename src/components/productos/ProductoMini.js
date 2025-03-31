import { Component } from "react";

import "./ProductoMini.scss";
import { Link } from "react-router-dom";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";

class ProductoMini extends Component {
  static contextType = GlobalFunctionsContext;
  constructor(props) {
    super(props);
  }
  
  render() {
    const { formatCurrency } = this.context;
    const lastChar =this.props.producto.nombre[this.props.producto.nombre.length - 1];
    let nombre = '';
    if (lastChar == ' ') {
      nombre =this.props.producto.nombre[this.props.producto.nombre.length -1].replace(/ /g, "_")
    } else {
      nombre =this.props.producto.nombre.replace(/ /g, "_")
    }
    return (
      <>
        <div className={"card " +( this.props.producto.inCart ? 'in-cart' : '')} >
        <Link to={`/producto/${this.props.producto.id}-${nombre}`} className="producto">
            <div className="image">
              <img
                loading="lazy"
                src={this.props.producto.preview}
                alt={this.props.producto.nombre}
              />
            </div>
            <div className="description ">
              <div className="categ">{this.props.producto.marca}</div>
              <div className="name">{this.props.producto.nombre}</div>
              {this.props.authenticated &&
                <div className="price price-wrapper Escolar">
                  <div>
                    <span className="price price-discount-0 price-discount-Escolar">
                      <span className="tipo tipo-Libro">PVP </span>
                      <span className="original-price tipo-Libro">
                        {formatCurrency(this.props.producto.pvp)}
                      </span>
                      <span className="discount">
                        {this.props.producto.descuento}% off
                      </span>
                    </span>
                  </div>
                  <div>
                    {formatCurrency(this.props.producto.precio)}
                  </div>
                </div>
              }
              {!this.props.authenticated && <div>Ingrese para ver los precios</div>}
            </div>
          </Link>
        </div>
        {/* 
          <a href={`/producto/${this.props.producto.id}`} className="producto">
        <div className="image">
          <img
            loading="lazy"
            src={this.props.producto.img}
            alt={this.props.producto.nombre}
          />
        </div>
        <div className="description ">
          <div className="categ">{this.props.producto.marca}</div>
          <div className="name">{this.props.producto.nombre}</div>
          <div className="price price-wrapper Escolar">
            <div>
              <span className="price price-discount-0 price-discount-Escolar">
                <span className="tipo tipo-Libro">PVP </span>
                <span className="original-price tipo-Libro">
                  $ {this.props.producto.pvp}
                </span>
                <span className="discount">
                  {this.props.producto.descuento}% off
                </span>
                {/*style="text-decoration: none"
              </span>
            </div>
            <div>
              <span className="price-symbol">$</span>
              {this.props.producto.precio}
            </div>
          </div>
        </div>
      </a> */}
      </>
    );
  }
}
export default ProductoMini;
