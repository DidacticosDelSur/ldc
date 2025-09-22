import { useState, useContext, useEffect } from 'react';
import { removeItem, updateCartData } from '../../services/CartServices';
import "./CartView.scss";
import { Alert, Button, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { AuthContext } from '../../services/AuthContext';
import CartResume from '../../components/cart/CartResume';
import { GlobalFunctionsContext } from '../../services/GlobalFunctionsContext';
import { useNavigate } from 'react-router-dom';
import ProductoAgregado from '../../components/productos/ProductoAgregado';

export default function Cart() {
  const { user, cart, updateCart, cantProdCart } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [visibleError, setVisibleError] = useState(false)
  const [message, setMessage] = useState('')
  const { formatCurrency } = useContext(GlobalFunctionsContext);

  const removeItemFromCart = async (itemId, idx, i = null) => {
    const variacionId = i ? cart[idx].variaciones[i].variacion_id : cart[idx].variacion_id;

    let params = {
      id: user.id,
      product: itemId,
      variation: variacionId
    }
    if (user.isSeller && user.clientSelected) {
      params = {
        ...params,
        cliente_id:  user.clientSelected
      }
    }

    removeItem(params)
      .then((data) => {
        updateCart(data);
      })
      .catch(err => console.log(err))
  };
  
  const updateItem = async (item, cant, idx, i = null ) => {
    const updatedItems = [...cart];
    let noStock = false;

    var f = new FormData();
    f.append("producto_id", item.producto_id);

    if (i==null) {
      updatedItems[idx].cantidad = cant;
      updatedItems[idx].subtotal = updatedItems[idx].cantidad * updatedItems[idx].precio * (1-updatedItems[idx].descuento_producto/100) * updatedItems[idx].alicuota;
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

  const handleProductLink = (id, name) => {
    const nombre = name.replace(/ /g, "-");
    navigate(`/producto/${id}-${nombre}`);
  }

  const handleUpdateValue = (item) => {
    console.log('updating', item);
  }

  const newOrder = () => {
    navigate('/checkout');
  }

  const keepShopping = () => {
    navigate('/');
  }

  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  return (
    <>
      <ProductoAgregado />
      <div className="purple-header z-0">
        <div className='content'>
          <div className='title'>Mi Carrito{/*  ({cantProdCart}) */}</div>
          <div className='subtitle'>Analizá, ajustá y confirmá tu pedido</div>
        </div>
      </div>
      <div className='cart-container'>
        <div className='content'>
          <Alert variant="danger" dismissible show={visibleError} onClose={() => setVisibleError(false)}>
            {message}
          </Alert>
          {cantProdCart > 0 &&
            <>
            <div className='cart-details p-0'>
              <Table>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Variacion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item,idx) => (
                  item.variaciones.length > 0
                  ? item.variaciones.map((v,i) =>
                    <tr className='left' key={`producto_${item.producto_id}`}>
                      <th>
                        <div className="inner-table">
                            <img
                                loading="lazy"
                                src={item.portada}
                              />
                            <Button variant='link' onClick={()=>{handleProductLink(item.producto_id, item.nombre)}}>
                            {item.nombre}
                            </Button>
                          </div>
                        </th>
                      <th className='left'>{v.nombre}</th>
                      <th>
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
                      </th>
                      <th className="left">$ {formatCurrency(item.precio)}</th>
                      <th><button onClick={() => removeItemFromCart(item.producto_id,idx,i)}>
                              <Trash />
                            </button></th>
                    </tr>)
                  :<tr className='left' key={`producto_${item.producto_id}`}>
                    <th><div className="inner-table">
                      <img
                          loading="lazy"
                          src={item.portada}
                        />
                      <Button variant='link' onClick={()=>{handleProductLink(item.producto_id, item.nombre)}}>
                      {item.nombre} 
                    </Button></div></th>
                    <th className='left'>-</th>
                    <th>
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
                    </th>
                    <th className="left">$ {formatCurrency(item.precio)}</th>
                    <th><button onClick={() => removeItemFromCart(item.producto_id, idx)}>
                      <Trash />
                    </button></th>
                  </tr>))}
                </tbody>
              </Table>
            </div>
            <CartResume handleFinish={newOrder} handleKeepShopping={keepShopping}/>
          </>
          }
          {cantProdCart === 0 &&
            <div className='cart-details'>
              <div className='number-items'>Carrito ({cantProdCart})</div>
              <p>No hay productos agregados. Agregue productos para verlos en esta sección.</p>
            </div>
          }
        </div>
      </div>
    </>
  );
}
