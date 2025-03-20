import { Component } from "react";
import './Producto.scss';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Alert, Button, Form, FormSelect, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Valentine } from "react-bootstrap-icons";
import CustomRadioButton from "../CustomRadioButton";
import { addProduct } from "../../services/ProductServices";

const settings = {
  /* customPaging: function(i) {
    return (
      <a>
        <img src={`${baseUrl}/abstract0${i + 1}.jpg`}/>
      </a>
    );
  }, */
  dots: true,
  className: "carousel-prod-amp",
  /*dotsClass: "slick-dots slick-thumb",  */
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
class Producto extends Component {
  constructor(props){
    super(props);
    this.state = {
      cantidad: 0,
      variaciones: [],
      subtotal: 0,
      canAddtoChart: false
    }
    this.formatNumber = this.formatNumber.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleUpdateValue = this.handleUpdateValue.bind(this);
    this.handleAddProducto = this.handleAddProducto.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { onVisible, onMessage, user } = this.props;
    if (prevProps.p.minimo_compra !== this.props.p.minimo_compra) {
      this.setState({minimo_compra: this.props.p.minimo_compra ? this.props.p.minimo_compra : 1 });
    }
    
    if ((prevProps.p.stock !== this.props.p.stock) || (prevProps.p.inCart !== this.props.p.inCart)) {
      this.setState((prevState) => ({
        cantidad: this.props.p.variaciones.length > 0 ? 0 : this.props.p.stock >= this.props.p.minimo_compra ? this.props.p.minimo_compra : 0,
        inCart: this.props.p.inCart ? this.props.p.inCart : 0,
        subtotal: this.props.p.variaciones.length > 0 ? 0 : this.props.p.stock >= this.props.p.minimo_compra ? this.props.p.minimo_compra * (this.props.p.precio * (1 - this.props.p.descuento/100) * prevState.alicuota): 0,
      }))
    }
    if (JSON.stringify(prevProps.p.variaciones) !== JSON.stringify(this.props.p.variaciones)) {
      let variations = [];

      this.props.p.variaciones.map((item => {
        variations.push({id: item.id,
          nombre: item.nombre,
          precio: item.precio ? item.precio : this.props.p.precio,
          cantidad: 0,
          subtotal: 0,
          inCart: item.inCart ? item.inCart : 0,
          descuento: item.descuento ? item.descuento : this.props.p.descuento,
          stock: item.stock ? item.stock : -1
        })
      }))
      this.setState((prevState)=>({
        cantidad: variations.length > 0 ? 0 : this.props.p.stock >= this.props.p.minimo_compra ? this.props.p.minimo_compra : 0,
        variaciones: variations,
        subtotal: variations.length > 0 ? 0 : this.props.p.stock >= this.props.p.minimo_compra ? this.props.p.minimo_compra * (this.props.p.precio * (1 - this.props.p.descuento/100) * prevState.alicuota): 0,
        canAddtoChart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ? variations.length > 0 ? !variations.every((variation) => variation.cantidad == 0) : true : false
      }))
    }
    if (this.props.p.variaciones.length === 0) {
      if ((this.state.stock != -1) && (this.state.stock < this.props.p.minimo_compra)) {
        onMessage('¡No hay suficiente stock!');
        onVisible(true);
      }
    }
  }

  componentDidMount(){
    const { onVisible, onMessage, user } = this.props;
    onVisible(false);
    if (this.props.p.id) {
      this.setState({
        minimo_compra: this.props.p.minimo_compra ? this.props.p.minimo_compra : 1,
        nombre: this.props.p.nombre,
        alicuota: this.props.p.alicuota ? this.props.p.alicuota : 1.21,
        stock: this.props.p.stock,
        inCart: this.props.p.inCart ? this.props.p.inCart : 0,
        precio: this.props.p.precio,
        descuento: this.props.p.descuento ? this.props.p.descuento : 0
      });
      let variations = [];
    
      this.props.p.variaciones.map((item => {
        variations.push({
          id: item.id,
          nombre: item.nombre,
          precio: item.precio ? item.precio : this.props.p.precio,
          cantidad: 0,
          subtotal: 0,
          inCart: item.inCart ? item.inCart : 0,
          descuento: item.descuento ? item.descuento : this.props.p.descuento ? this.props.p.descuento : 0,
          stock: item.stock ? item.stock : -1
        })
      }))
      this.setState((prevState)=>({
        cantidad: variations.length > 0 ? 0 : this.props.p.stock >= this.props.p.minimo_compra ? this.props.p.minimo_compra : 0,
        variaciones: variations,
        subtotal: variations.length > 0 ? 0 : this.props.p.stock >= this.props.p.minimo_compra ? this.props.p.minimo_compra * (this.props.p.precio * (1 - this.props.p.descuento/100) * prevState.alicuota): 0,
        canAddtoChart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ? variations.length > 0 ? !variations.every((variation) => variation.cantidad == 0) : true : false,
        
      }))
      if (this.props.p.variaciones.length === 0) {
        if ((this.state.stock != -1) && (this.state.stock < this.props.p.minimo_compra)) {
          onMessage('¡No hay suficiente stock!');
          onVisible(true);
        }
      }
    }
  }

  formatNumber(q) {
    let currency = '';
    if (q || q == 0) {
      currency = q.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      })
    }
    return currency;
  }

  handleIncrementVariation(i) {
    const { onMessage, onVisible, user } = this.props;
    const nuevosVar = [...this.state.variaciones];
    const nuevoValor = nuevosVar[i].cantidad + this.state.minimo_compra;
    nuevosVar[i].cantidad = nuevoValor;
    const newPrice = nuevosVar[i].precio*(1-nuevosVar[i].descuento/100)*this.state.alicuota;
    nuevosVar[i].subtotal = nuevosVar[i].cantidad*newPrice;
    const subtotal = this.state.subtotal + (this.state.minimo_compra * newPrice);

    this.setState((prevState)=>({
      variaciones: nuevosVar,
      subtotal: subtotal,
      canAddtoChart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ? true : false
    }))
    if ((nuevosVar[i].stock != -1) && (nuevosVar[i].stock < nuevoValor)) {
      onMessage('¡No hay suficiente stock!');
      onVisible(true);
    }
  };

  handleIncrement() {
    const { onMessage, onVisible, user } = this.props;
    const nuevoValor = this.state.cantidad + this.state.minimo_compra;
    const newPrice = this.props.p.precio * (1-this.state.descuento/100) * this.state.alicuota;
    this.setState((prevState) => ({
        cantidad: prevState.cantidad + this.state.minimo_compra,
        subtotal: prevState.subtotal + (this.state.minimo_compra * newPrice),
        canAddtoChart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ? true : false
      }))
    if ((this.state.stock != -1) && (this.state.stock < nuevoValor)) {
      onMessage('¡No hay suficiente stock!');
      onVisible(true);
    }
  };

  handleDecrementVariation(i) {
    const { onVisible, user } = this.props;
    onVisible(false);
    const nuevosVar = [...this.state.variaciones];
    nuevosVar[i].cantidad = nuevosVar[i].cantidad - this.state.minimo_compra;
    const newPrice = nuevosVar[i].precio*(1-nuevosVar[i].descuento/100)*this.state.alicuota;
    nuevosVar[i].subtotal = nuevosVar[i].cantidad*newPrice;
    const subtotal = this.state.subtotal - (this.state.minimo_compra * newPrice);

    this.setState({
      variaciones: nuevosVar,
      subtotal: subtotal,
      canAddtoChart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ? !nuevosVar.every((variation) => variation.cantidad == 0) : false
    })
  };

  handleDecrement() {
    const { onVisible, user } = this.props;
    onVisible(false);
    const newPrice = this.props.p.precio * (1-this.state.descuento/100) * this.state.alicuota;
    this.setState((prevState) => ({
      cantidad: prevState.cantidad - this.state.minimo_compra,
      subtotal: prevState.subtotal - (this.state.minimo_compra * newPrice),
      canAddtoChart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ? (prevState.cantidad - this.state.minimo_compra) != 0 : false
    }))
  };

  handleUpdateValue(val) {
    const { user } = this.props;
    this.setState({
      cantidad: val,
      canAddtoChart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ?  val != 0 : false
    })
  }

  handleAddProducto() {
    const { onAddItemToCart } = this.props;
    onAddItemToCart(this.state);
  }

  render(){
    return (
      <div className="content-product">
        <div className="box">
          <div className="slider-container">
            <Slider {...settings}>
              {this.props.p.media && 
                this.props.p.media.map((item) => {
                  return (
                    <div key={`media_${item.id}`}>
                      <img src={item.preview} alt={item.alt} />
                    </div>
                  )
                })
              }
            </Slider></div>
        </div>
        <div className="box description">
          <h2>{this.props.p.nombre}</h2>
          <Link to="/marca/prueba"><h3 className="marca">{this.props.p.marca_nombre}</h3></Link>
          <div className="tags-group"></div>
          <div className="contenido">
            <p>
              {this.props.p.descripcion}
            </p>
            {this.props.authenticated && (this.props.p.descuento > 0 && 
              <div className="price-box">
                <div className="price-wrapper">
                  <div>
                    <div className="final-price">PRECIO ORIGINAL</div>
                    <span className="discount">{this.formatNumber(this.props.p.precio)}</span>
                  </div>
                </div>
                <div className="lh-1">
                  <span className="discount-amount">{this.props.p.descuento}% OFF 🔥<br /><span>PRODUCTO SELECCIONADO</span></span>
                </div>
              </div>)
            }
            {this.props.authenticated && 
              <div className="price-box">
                <div className="final-price">
                  <span>PRECIO</span><br />
                  <span className="price">{
                    this.props.p.descuento > 0 ? this.formatNumber(this.props.p.precio * (1-this.props.p.descuento/100)) : this.formatNumber(this.props.p.precio)
                  }</span>
                  <div className="iva">+IVA</div>
                </div>
                {this.props.p.descuento > 0 &&
                  <div className="descuento">
                    <span className="icon-discount"></span>Descuento {this.props.p.descuento}%
                  </div>
                }
              </div>}
              {this.props.authenticated && this.props.p.variaciones.length > 0 && (
              <div className="inner-content">
                <div key={`inline-radio`} className="mb-3">
                  <h6>Eliga una variacion</h6>
                  <Table>
                    <thead>
                      <tr>
                        <th>Color/Diseño</th>
                        <th>Precio</th>
                        <th>Dto.</th>
                        <th>Cant.</th>
                        <th>Subtotal</th>
                        <th>En Carrito</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.variaciones.map((item,i) => {
                        return (
                          <tr key={`variacion_${i}`}>
                            <td>{item.nombre}</td>
                            <td>{this.formatNumber(item.precio)}</td>
                            <td>{item.descuento}%</td>
                            <td>
                              <div className="input-container">
                                <button className="control-btn" disabled={item.cantidad === 0} onClick={() => {this.handleDecrementVariation(i)}}>-</button>
                                <input
                                  type="number"
                                  className="input-number"
                                  value={item.cantidad}
                                  onChange={(e) => this.handleUpdateValue(parseInt(e.target.value))}
                                />
                                <button className="control-btn" onClick={()=>{this.handleIncrementVariation(i)}}>+</button>
                              </div>
                            </td>
                            <td>{this.formatNumber(item.subtotal)}</td>
                            <td>{item.inCart}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </div>
          {this.props.authenticated && this.props.p.variaciones.length == 0 ?
            <>
              {this.state.inCart > 0 && <div>Tiene {this.state.inCart} en el carrito</div>}
              <div className="input-container">
                <button className="control-btn" onClick={this.handleDecrement}>-</button>
                <input
                  type="number"
                  className="input-number"
                  value={this.state.cantidad}
                  onChange={(e) => this.handleUpdateValue(parseInt(e.target.value))}
                />
                <button className="control-btn" onClick={this.handleIncrement}>+</button>
              </div>
            </>
            : null
          }
          {this.props.authenticated &&
            <div>Subtotal: <strong>{this.formatNumber(this.state.subtotal)}</strong>{this.state.subtotal > 0 ? <i> (iva incluido)</i> : ``}</div>
          }
          <div>
            <div className="contenido">
              <textarea className="type-" value={this.state.observaciones} placeholder="Observaciones del producto" name="observaciones" id="observaciones" cols="30" rows="3" 
              onChange={(e)=>this.setState({observaciones: e.target.value})}></textarea>
            </div>
          </div>
          <div className="buttons">
            {(this.props.authenticated && this.state.canAddtoChart ) &&
              <>
                <Button className="button-rounded" onClick={this.handleAddProducto}>Agregar al carrito</Button>
                <Button className="button-rounded outlined">Comprar Ahora</Button>
              </>
            }
            {(this.props.authenticated && this.state.observaciones ) &&
              <>
                <Button className="button-rounded" onClick={this.handleAddProducto}>Guardar</Button>
              </>
            }
            {!this.props.authenticated && 
              <>
                <Button className="button-rounded" onClick={()=>{window.location.href = "#/login";}}>Iniciar Sesión</Button>
                <Button className="button-rounded outlined" onClick={()=>{window.location.href = "#/registro";}}>Registrate</Button>
              </>
            }
          </div>
          <div className="updated type-">
            <span className="icon-schedule"></span>
            Actualizado el {this.props.p.actualizado}
          </div>
        </div>
      </div>
    );
  }
}

export default Producto;