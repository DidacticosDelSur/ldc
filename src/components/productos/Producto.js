import { useContext, useEffect, useState } from "react";
import './Producto.scss';
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";
import SliderComponent from "../SliderComponent";
import { ArrowLeft } from "react-bootstrap-icons";
import { AuthContext } from "../../services/AuthContext";

export default function Producto({prod, onVisible, onMessage, onAddItemToCart, onKeepShopping}) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { formatCurrency } = useContext(GlobalFunctionsContext);
  const [productData, setProductData] = useState({variaciones: []});

  useEffect(()=>{
    let variations = [];

    prod.variaciones.map((item => {
      variations.push({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio ? item.precio : prod.precio,
        cantidad: 0,
        subtotal: 0,
        inCart: item.inCart ? item.inCart : 0,
        descuento: item.descuento ? item.descuento : prod.descuento,
        stock: item.stock ? item.stock : -1
      })
    }))

    setProductData({
      nombre: prod.nombre,
      alicuota: prod.alicuota ? prod.alicuota : 1.21,
      stock: prod.stock,
      precio: prod.precio,
      descuento: prod.descuento ? prod.descuento : 0,
      cantidad: variations.length > 0
        ? 0
        : prod.stock >= prod.minimo_compra
          ? prod.minimo_compra
          : 0,
      variaciones: variations,
      subtotal: variations.length > 0
        ? 0
        : prod.stock >= prod.minimo_compra
          ? prod.minimo_compra * (prod.precio * (1-prod.descuento/100)*prod.alicuota)
          : 0,
      canAddtoCart: user
        ? ((user.isSeller && user.clientSelected > 0) || !user.isSeller)
          ? variations.length > 0
            ? !variations.every((variation) => variation.cantidad == 0)
            : prod.stock >= prod.minimo_compra
          : false
        : false,
      minimo_compra: prod.minimo_compra
        ? prod.minimo_compra != 0
          ? prod.minimo_compra
          : 1
        : 1,
      inCart: prod.inCart ? prod.inCart : 0
    })
  },[prod]);

  const handleDecrement = (i=-1) => {
    onVisible(false);
    let newVariations = [...productData.variaciones];
    let newAmount = productData.cantidad;
    let newPrice = productData.precio;
    let subtotal = productData.subtotal;
    const newStock = i != -1 ? newVariations[i].stock : productData.stock;
    
    const addToCart = i != -1
      ? newVariations.every((variation) => variation.cantidad == 0)
      : (productData.cantidad - productData.minimo_compra != 0);

    if (i != -1) {
      newAmount = newVariations[i].cantidad - productData.minimo_compra;
      newVariations[i].cantidad = newAmount;
      newPrice = newVariations[i].precio*(1-newVariations[i].descuento/100)*productData.alicuota;
      newVariations[i].subtotal = newVariations[i].cantidad*newPrice;
    } else {
      newAmount -= productData.minimo_compra;
      newPrice = productData.precio * (1 -productData.descuento / 100) * productData.alicuota;
    }
    subtotal -= productData.minimo_compra * newPrice;
    setProductData((prevData) => ({
      ...prevData,
      variaciones: newVariations,
      cantidad: newAmount,
      subtotal: subtotal,
      canAddtoCart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ? addToCart : false
    }));

    if ((newStock != -1) && (newStock < newAmount)) {
      onMessage('¡No hay suficiente stock!');
      onVisible(true);
    }
  };

  const handleIncrement = (i=-1) => {
    let newVariations = [...productData.variaciones];
    let newAmount = productData.cantidad;
    let newPrice = productData.precio;
    let subtotal = productData.subtotal;
    const newStock = i != -1 ? newVariations[i].stock : productData.stock;

    if (i!=-1) {
      newAmount = newVariations[i].cantidad + productData.minimo_compra;
      newVariations[i].cantidad = newAmount;
      newPrice = newVariations[i].precio*(1-newVariations[i].descuento/100)*productData.alicuota;
      newVariations[i].subtotal = newVariations[i].cantidad*newPrice;
    } else {
      newAmount += productData.minimo_compra;
      newPrice = productData.precio * (1 -productData.descuento / 100) * productData.alicuota;
    }
    subtotal += productData.minimo_compra * newPrice;
    setProductData((prevData) => ({
      ...prevData,
      variaciones: newVariations,
      cantidad: newAmount,
      subtotal: subtotal,
      canAddtoCart: ((user.isSeller && user.clientSelected > 0) || !user.isSeller) ? true : false
    }));

    if ((newStock != -1) && (newStock < newAmount)) {
      onMessage('¡No hay suficiente stock!');
      onVisible(true);
    }
  }

  const handleKeepShopping = () => {
    onKeepShopping();
  }

  const handleAddProducto = () => {
    onAddItemToCart(productData);
  }

  return (
    <div className="content-product">
      <div className="box">
        <SliderComponent images={prod.media}></SliderComponent>
      </div>
      <div className="box description">
        <h2>{prod.nombre}</h2>
        {prod.variaciones.length === 0 && prod.stock === 0 &&
          <p className="no-stock">Sin Stock</p>
        }
        <Link to="/marca/prueba"><h3 className="marca">{prod.marca_nombre}</h3></Link>
        <div className="tags-group"></div>
        <div className="contenido">
          <p>
            {prod.descripcion}
          </p>
          {isAuthenticated && (prod.descuento > 0 && 
            <div className="price-box">
              <div className="price-wrapper">
                <div>
                  <div className="final-price">PRECIO ORIGINAL</div>
                  <span className="discount">{formatCurrency(prod.precio)}</span>
                </div>
              </div>
              <div className="lh-1">
                <span className="discount-amount">{prod.descuento}% OFF 🔥<br /><span>PRODUCTO SELECCIONADO</span></span>
              </div>
            </div>)
          }
          {isAuthenticated && 
            <div className="price-box">
              <div className="final-price">
                <span>PRECIO</span><br />
                <span className="price">{
                  prod.descuento > 0 ? formatCurrency(prod.precio * (1-prod.descuento/100)) : formatCurrency(prod.precio)
                }</span>
                <div className="iva">+IVA</div>
              </div>
              {prod.descuento > 0 &&
                <div className="descuento">
                  <span className="icon-discount"></span>Descuento {prod.descuento}%
                </div>
              }
            </div>}
            {isAuthenticated && prod.variaciones.length > 0 && (
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
                    {productData.variaciones.map((item,i) => {
                      return (
                        <tr key={`variacion_${i}`}>
                          <td>{item.nombre}</td>
                          <td>{formatCurrency(item.precio)}</td>
                          <td>{item.descuento}%</td>
                          <td>
                            <div className="input-container">
                              <button className="control-btn" disabled={item.cantidad === 0} onClick={() => {handleDecrement(i)}}>-</button>
                              <input
                                type="number"
                                className="input-number"
                                value={item.cantidad}
                                readOnly
                              />
                              <button className="control-btn" onClick={()=>{handleIncrement(i)}}>+</button>
                            </div>
                          </td>
                          <td>{formatCurrency(item.subtotal)}</td>
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
        {isAuthenticated && prod.variaciones.length == 0 ?
          <>
            {productData.inCart > 0 && <div>Tiene {productData.inCart} en el carrito</div>}
            <div className="input-container">
              <button className="control-btn" disabled={productData.cantidad === 0} onClick={()=>{handleDecrement()}}>-</button>
              <input
                type="number"
                className="input-number"
                value={productData.cantidad}
                readOnly
              />
              <button className="control-btn" onClick={()=>{handleIncrement()}}>+</button>
            </div>
          </>
          : null
        }
        {isAuthenticated &&
          <div>Subtotal: <strong>{formatCurrency(productData.subtotal)}</strong>{productData.subtotal > 0 ? <i> (iva incluido)</i> : ``}</div>
        }
        <div>
          <div className="contenido">
            <textarea className="type-" value={productData.observaciones} placeholder="Observaciones del producto" name="observaciones" id="observaciones" cols="30" rows="3" 
            onChange={(e)=>this.setState({observaciones: e.target.value})}></textarea>
          </div>
        </div>
        <div className="buttons">
          {(isAuthenticated && productData.canAddtoCart ) &&
            <>
              <Button className="button-rounded" onClick={handleAddProducto}>Agregar al carrito</Button>
              <Button className="button-rounded outlined">Comprar Ahora</Button>
            </>
          }
          {(isAuthenticated && productData.observaciones ) &&
            <>
              <Button className="button-rounded" onClick={handleAddProducto}>Guardar</Button>
            </>
          }
          {!isAuthenticated && 
            <>
              <Button className="button-rounded" onClick={()=>{window.location.href = "#/login";}}>Iniciar Sesión</Button>
              <Button className="button-rounded outlined" onClick={()=>{window.location.href = "#/registro";}}>Registrate</Button>
            </>
          }
        </div>
        {isAuthenticated && 
          <Button variant="link" onClick={handleKeepShopping} className="follow">
            <ArrowLeft />
            <span>Seguir comprando</span>
          </Button>
        }
        <div className="updated type-">
          <span className="icon-schedule"></span>
          Actualizado el {prod.actualizado}
        </div>
      </div>
    </div>
  );
}
