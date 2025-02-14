import { Component } from "react";
import './Producto.scss';
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { Button, Form, FormSelect } from "react-bootstrap";
import { Valentine } from "react-bootstrap-icons";
import CustomRadioButton from "../CustomRadioButton";

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
      //value: props.p.minimo_compra ? props.p.minimo_compra : 0,
      value: 0,
      variacion_id: 0,
      minimo_compra: props.p.minimo_compra ? props.p.minimo_compra : 1,
      selectedOption: 0
    }
    this.formatNumber = this.formatNumber.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleUpdateValue = this.handleUpdateValue.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.p.minimo_compra !== this.props.p.minimo_compra) {
      this.setState({value: this.props.p.minimo_compra ? this.props.p.minimo_compra : 1, minimo_compra: this.props.p.minimo_compra ? this.props.p.minimo_compra : 1 });
    }
  }
  handleChange = (event) => {
    this.setState((prevState) => ({
      selectedOption: event.target.value
    }));
  };

  formatNumber(q) {
    let currency = '';
    if (q) {
      currency = q.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      })
    }
    return currency;
  }

  handleIncrement() {
    console.log('antes de increment',this.state);
    this.setState((prevState) => ({
      value: prevState.value + this.state.minimo_compra
    }))
    console.log('despues de increment',this.state);
  };

  handleDecrement() {
    this.setState((prevState) => ({
      value: prevState.value - this.state.minimo_compra
    }))
  };

  handleUpdateValue(val) {
    this.setState((prevState) => ({
      value: val
    }))
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
                    <div>
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
            {this.props.p.variaciones.length > 0 && (
              <div className="inner-content">
                <div key={`inline-radio`} className="mb-3">
                  <h6>Eliga una variacion</h6>
                  <div className="radio-container">
              
                  {this.props.p.variaciones.map((item) => {
                    return  <CustomRadioButton
                            key={`var_op_${item.value}`}
                            id={`option_${item.value}`}
                            label={item.label}
                            value={item.value}
                            checked={this.state.selectedOption == item.value}
                            onChange={this.handleChange}
                          />
                  })}
                  </div>
                </div>
              </div>
            )}
             {this.props.p.descuento > 0 && 
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
              </div>
             }
            <div className="price-box">
              <div className="final-price">
                <span>PRECIO</span><br />
                <span className="price">{
                  this.props.p.descuento > 0 ? this.formatNumber(this.props.p.precioDesc) : this.formatNumber(this.props.p.precio)
                }</span>
                <div className="iva">+IVA</div>
              </div>
              {this.props.p.descuento > 0 &&
                <div className="descuento">
                  <span className="icon-discount"></span>Descuento {this.props.p.descuento}%
                </div>
              }
              
            </div>
          </div>
          <div className="input-container">
            <button className="control-btn" onClick={this.handleDecrement}>-</button>
            <input
              type="number"
              className="input-number"
              value={this.state.value}
              onChange={(e) => this.handleUpdateValue(parseInt(e.target.value))}
            />
            <button className="control-btn" onClick={this.handleIncrement}>+</button>
          </div>
          <div className="cant-box type-">
            {/* <div className="quantBox">
              <div className="quantity">
                <div className="input">
                  {this.props.p.minimo_compra && (
                    <input name="cant_prod" id="cant_prod" type="number" min={this.props.p.minimo_compra} step={this.props.p.minimo_compra} defaultValue={this.props.p.minimo_compra} disabled="" />
                  )}
                  {!this.props.p.minimo_compra && (
                    <input name="cant_prod" id="cant_prod" type="number" min="1" step="1" defaultValue="1" disabled="" />
                  )}
                </div><div className="quantity-nav"><div className="quantity-button quantity-up"><span>+</span></div><div className="quantity-button quantity-down"><span>-</span></div></div>
              </div>
            </div> */}
            <div className="contenido"><textarea className="type-" placeholder="Observaciones del producto" name="observaciones" id="observaciones" cols="30" rows="3"></textarea></div>
          </div>
          <div className="buttons">
            <Button className="button-rounded">Agregar al carrito</Button>
            <Button className="button-rounded outlined">Comprar Ahora</Button>
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