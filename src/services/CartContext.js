import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context
export const CartContext = createContext();

// CartProvider component to provide auth state
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cantProdCart, setCantProdCart] = useState(0);
  const [order, setOrder] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [descuento, setDescuento]= useState(0);
  const [total, setTotal] = useState(0);

  const isEmpty = (obj) => Object.keys(obj).length === 0;

  const updateCart = (newCart) => {
    if (newCart.length == 0) {
      localStorage.removeItem('cart');
      setCantProdCart(0);
    } else {
      localStorage.setItem('cart', JSON.stringify(newCart));
      setCantProdCart(
        newCart ? 
        newCart.reduce((acumulado, producto) =>
          producto.variaciones.length == 0 ?
          acumulado + 1
          : acumulado + producto.variaciones.length
          ,
        0)
        : 0
      )
    }
    setCart(newCart);
  }

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

  const updateOrder = (newOrder) => {
    if (isEmpty(newOrder)){
      localStorage.removeItem('order');
    } else {
      localStorage.setItem('order', JSON.stringify(newOrder));
    }
    setOrder(newOrder);
  }

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras verificamos el estado de autenticación
  }

  return (
    <CartContext.Provider value={{ cart, updateCart, cantProdCart, order, updateOrder, subtotal, iva, total, descuento }}>
      {children}
    </CartContext.Provider>
  );
};
