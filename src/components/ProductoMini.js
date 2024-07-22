import { Component } from "react";

import "./ProductoMini.scss";

class ProductoMini extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <>
        <div className="card">
          <a href={`/producto/${this.props.producto.id}`} className="producto">
            <div className="image">
              <img
                loading="lazy"
                src={this.props.producto.imageurl}
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
                  </span>
                </div>
                <div>
                  <span className="price-symbol">$</span>
                  {this.props.producto.precio}
                </div>
              </div>
            </div>
          </a>
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
