import React, { useState, useEffect, useContext } from 'react';
import { removeItem, updateCartData } from '../services/CartServices';
import "./CartView.scss";
import { Alert, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { AuthContext } from '../services/AuthContext';

function Cart() {
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [descuento, setDescuento]= useState(0);
  const [total, setTotal] = useState(0);
  const { user, cart, updateCart, cantProdCart } = useContext(AuthContext);
  
  const [visibleError, setVisibleError] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setTotal((prev) => prev + subtotal)
  },[subtotal]);

  useEffect(() => {
    setTotal((prev) => prev + iva)
  },[iva]);

  useEffect(() => {
    setTotal((prev) => prev - descuento)
  },[descuento]);

  useEffect(() => {
    setTotal(0);
    setSubtotal(
      cart.reduce((acumulado, producto) => 
        producto.variaciones.length == 0 ?
        acumulado + (producto.cantidad * producto.precio)
        : acumulado + producto.variaciones.reduce((acu,vari) => acu + (vari.cantidad * vari.precio) , 0)
        ,
      0)
    );

    setIva(
      cart.reduce((acumulado, producto) => 
        producto.variaciones.length == 0 ?
        acumulado + (producto.subtotal - (producto.subtotal/producto.alicuota))
        : acumulado + producto.variaciones.reduce((acu,vari) => acu + (vari.subtotal - (vari.subtotal/producto.alicuota)), 0)
        ,
      0)
    );

    setDescuento(
      cart.reduce((acumulado, producto) => 
        producto.variaciones.length == 0 ?
        acumulado + ((producto.cantidad * producto.precio) * (producto.descuento/100))
        : acumulado + producto.variaciones.reduce((acu,vari) => acu + (vari.cantidad * vari.precio) * (vari.descuento/100), 0)
        ,
      0)
    );

  }, [cart]);

  const removeItemFromCart = async (itemId, idx, i = null) => {
    const variacionId = i ? cart[idx].variaciones[i].variacion_id : cart[idx].variacion_id;
    const clientId = (user.isSeller && user.clientSelected) ? user.clientSelected : null;

    const params = {
      id: user.id,
      product: itemId,
      variation: variacionId,
      cliente_id: clientId
    }

    removeItem(params)
      .then((data) => {
        updateCart(data);
      })
      .catch(err => console.log(err))
   // 
  };
  
  const updateItem = async (item, cant, idx, i = null ) => {
    const updatedItems = [...cart];
    let noStock = false;

    var f = new FormData();
    f.append("producto_id", item.producto_id);
    f.append("descuento", item.descuento);
    f.append("alicuota", item.alicuota);
    f.append("precio", item.precio);

    if (i==null) {
      updatedItems[idx].cantidad = cant;
      updatedItems[idx].subtotal = updatedItems[idx].cantidad * updatedItems[idx].precio * (1-updatedItems[idx].descuento/100) * updatedItems[idx].alicuota;
      if ((updatedItems[idx].stock != -1) && (updatedItems[idx].stock < updatedItems[idx].cantidad)) {
        noStock = true;
      }
    } else {
      updatedItems[idx].variaciones[i].cantidad = cant;
      updatedItems[idx].variaciones[i].subtotal = updatedItems[idx].variaciones[i].cantidad * updatedItems[idx].variaciones[i].precio * (1-updatedItems[idx].variaciones[i].descuento/100) * updatedItems[idx].alicuota;
      if ((updatedItems[idx].variaciones[i].stock != -1) && (updatedItems[idx].variaciones[i].stock < updatedItems[idx].variaciones[i].cantidad)) {
        noStock=true;
      }
      f.append("variacion_id", updatedItems[idx].variaciones[i].variacion_id);
    }
    f.append("cantidad", cant);
    f.append("subtotal", item.subtotal);

    if (noStock) {
      setMessage('¡No hay suficiente stock!');
      setVisibleError(true);
    }

    if (user.isSeller && user.clientSelected) {
      f.append("cliente_id", user.clientSelected);
    }
    
    updateCartData(user.id,f)
      .then((data) => {
        updateCart(updatedItems)
      })
      .catch(err => console.log(err))
  }
  const handleIncrementVariation = (item, idx, i = null) => {
    const updatedItems = [...cart];
    let prevCant = 0;

    if (i==null) {
      prevCant = updatedItems[idx].cantidad;
    } else {
      prevCant = updatedItems[idx].variaciones[i].cantidad;
    }
    const cantidad = prevCant + updatedItems[idx].minimo_compra;
    updateItem(item, cantidad, idx, i);
  }

  const handleDecrementVariation = (item, idx, i = null) => {
    const updatedItems = [...cart];
    let prevCant = 0;

    if (i==null) {
      prevCant = updatedItems[idx].cantidad;
    } else {
      prevCant = updatedItems[idx].variaciones[i].cantidad;
    }
    const cantidad = prevCant - updatedItems[idx].minimo_compra;
    updateItem(item, cantidad, idx, i);
  }


  const handleUpdateValue = (item) => {
    console.log('updating', item);
  }

  const formatNumber = (q) => {
    let currency = '';
    if (q || q == 0) {
      currency = q.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS'
      })
    }
    return currency;
  }

  return (
    <div className='cart-container'>
      <Alert variant="danger" dismissible show={visibleError} onClose={() => setVisibleError(false)}>
        {message}
      </Alert>
      <div className='cart-details'>
        <div className='number-items'>Carrito ({cantProdCart})</div>
        <ListGroup>
        {cart.map((item,idx) => (
          item.variaciones.length > 0 ?
          <ListGroupItem key={`producto_${item.producto_id}`}
          >
            {item.nombre} 
              <ListGroup>
                {item.variaciones.map((v,i) => 
                  <ListGroupItem key={`variacion_${v.id}`} className="d-flex justify-content-between align-items-start">
                    {v.nombre} 
                    <div className="input-container">
                      <button className="control-btn" disabled={v.cantidad === item.minimo_compra} onClick={() => {handleDecrementVariation(v,idx,i)}}>-</button>
                      <input
                        type="number"
                        className="input-number"
                        value={v.cantidad}
                        onChange={(e) => handleUpdateValue(parseInt(e.target.value))}
                      />
                      <button className="control-btn" onClick={()=>{handleIncrementVariation(v, idx,i)}}>+</button>
                    </div>
                    {formatNumber(v.subtotal)}
                    <button onClick={() => removeItemFromCart(item.producto_id,idx,i)}>
                      <Trash />
                    </button>
                  </ListGroupItem>
                )}
              </ListGroup>
          </ListGroupItem>
        : <ListGroupItem  key={item.id} className="d-flex justify-content-between align-items-start">
          {item.nombre}
          <div className="input-container">
            <button className="control-btn" disabled={item.cantidad === item.minimo_compra} onClick={() => {handleDecrementVariation(item,idx)}}>-</button>
            <input
              type="number"
              className="input-number"
              value={item.cantidad}
              onChange={(e) => handleUpdateValue(parseInt(e.target.value))}
            />
            <button className="control-btn" onClick={()=>{handleIncrementVariation(item,idx)}}>+</button>
          </div>
          {formatNumber(item.subtotal)}
          <button onClick={() => removeItemFromCart(item.producto_id, idx)}>
            <Trash />
          </button>
        </ListGroupItem>
        ))}
        </ListGroup>
      </div>
      <div className='resumen'>
        <div>Resumen de compra</div>
        <ListGroup>
          <ListGroupItem>
            Subtotal: <span>{formatNumber(subtotal)}</span>
          </ListGroupItem>
          <ListGroupItem>
            Descuento: <span>{formatNumber(descuento)}</span>
          </ListGroupItem>
          <ListGroupItem>
            Iva: <span>{formatNumber(iva)}</span>
          </ListGroupItem>
          <ListGroupItem>
            Total: <span>{formatNumber(total)}</span>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}

export default Cart;
