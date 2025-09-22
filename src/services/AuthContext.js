import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create a context
export const AuthContext = createContext();

// AuthProvider component to provide auth state
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Estado de carga
  const [cart, setCart] = useState([]);
  const [cantProdCart, setCantProdCart] = useState(0);
  const [order, setOrder] = useState([]);

  const [subtotal, setSubtotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [descuento, setDescuento]= useState(0);
  const [total, setTotal] = useState(0);


  const isEmpty = (obj) => Object.keys(obj).length === 0;

  // Check if there's an auth token in sessionStorage (or another form of persistent storage)
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    const storedOrder = JSON.parse(localStorage.getItem('order'));
    const storedCant = JSON.parse(localStorage.getItem('cantProd'));

    if (token && storedUser) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
      logout();
      } else {
        setIsAuthenticated(true); // Assume token is valid
        setUser(storedUser); // Si hay un usuario en sessionStorage, establecerlo en el estado
        setCart(storedCart);
        setOrder(storedOrder);
        setCantProdCart(storedCant);
        //updateCart(storedCart);
      }
    }
    setLoading(false);  // Terminar la carga
  }, []);

  useEffect(()=>{
    sessionStorage.setItem('user', JSON.stringify(user))
  },[user])

  const login = (data) => {
    sessionStorage.setItem('authToken', data.token);
    sessionStorage.setItem('user', JSON.stringify({name: data.name, id: data.userId, isSeller: data.isSeller, clientSelected: null, discount: data.discount, disc_visib: data.discount_visible}))
    setIsAuthenticated(true);
    setUser({name: data.name, id: data.userId, isSeller: data.isSeller, clientSelected: null, discount: data.discount, disc_visib: data.discount_visible})
    updateCart(data.cart);
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    updateCart([]);
    updateOrder({});
  };
  
  const updateCart = (newCart) => {
    if (newCart.length == 0) {
      localStorage.removeItem('cart');
      localStorage.setItem('cantProd',0);
      setCantProdCart(0);
    } else {
      localStorage.setItem('cart', JSON.stringify(newCart));
      const cantidad = newCart ? 
      newCart.reduce((acumulado, producto) =>
        producto.variaciones.length == 0 ?
        acumulado + 1
        : acumulado + producto.variaciones.length
        ,
      0)
      : 0;
      setCantProdCart(cantidad);
      localStorage.setItem('cantProd', cantidad);
    }
    setCart(newCart);
  }

  const updateOrder = (newOrder) => {
    if (isEmpty(newOrder)){
      localStorage.removeItem('order');
    } else {
      newOrder = {
        ...newOrder,
        subtotal: subtotal,
        descuento: descuento,
        iva: iva,
        total: total
      }
      localStorage.setItem('order', JSON.stringify(newOrder));
    }
    setOrder(newOrder);
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
    if (cart) {
      setTotal(0);
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      const dto_iva = (storedUser && storedUser.disc_visib && storedUser.discount >0) ? storedUser.discount : 0;
      setSubtotal(
        cart.reduce((acumulado, producto) => 
          producto.variaciones.length == 0 ?
          acumulado + (producto.cantidad * producto.precio)
          : acumulado + producto.variaciones.reduce((acu,vari) => acu + (vari.cantidad * vari.precio) , 0)
          ,
        0)
      );
      const iv = cart.reduce((acumulado, producto) => 
          producto.variaciones.length == 0 ?
          acumulado + (producto.subtotal * (1-dto_iva/100) * (1 - 1/producto.alicuota))
          : acumulado + producto.variaciones.reduce((acu,vari) => acu + (vari.subtotal * (1-dto_iva/100) * (1-1/producto.alicuota)), 0)
          ,
        0)
        console.log(cart, iv)
      setIva(
        cart.reduce((acumulado, producto) => 
          producto.variaciones.length == 0 ?
          acumulado + (producto.subtotal * (1-dto_iva/100) * (1 - 1/producto.alicuota))
          : acumulado + producto.variaciones.reduce((acu,vari) => acu + (vari.subtotal * (1-dto_iva/100) * (1-1/producto.alicuota)), 0)
          ,
        0)
      );
      setDescuento(
        cart.reduce((acumulado, producto) => 
          producto.variaciones.length == 0 ?
          acumulado + ((producto.cantidad * producto.precio) * (producto.descuento_producto/100))
          : acumulado + producto.variaciones.reduce((acu,vari) => acu + (vari.cantidad * vari.precio) * (vari.descuento/100), 0)
          ,
        0)
      );
    }
    
  }, [cart]);

  const valores = { isAuthenticated, login, logout, user, setUser, cart, updateCart, cantProdCart, order, updateOrder, subtotal, iva, total, descuento, isEmpty };

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras verificamos el estado de autenticación
  }

  return (
    <AuthContext.Provider value={ valores }>
      {children}
    </AuthContext.Provider>
  );
};
