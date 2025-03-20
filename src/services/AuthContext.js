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


  // Check if there's an auth token in sessionStorage (or another form of persistent storage)
  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    const storedCart = JSON.parse(localStorage.getItem('cart'));

    if (token && storedUser) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
       logout();
      } else {
        setIsAuthenticated(true); // Assume token is valid
        setUser(storedUser); // Si hay un usuario en sessionStorage, establecerlo en el estado
        setCart(storedCart);
      }
    }
    setLoading(false);  // Terminar la carga
  }, []);


  const login = (data) => {
    sessionStorage.setItem('authToken', data.token);
    sessionStorage.setItem('user', JSON.stringify({name: data.name, id: data.userId, isSeller: data.isSeller, clientSelected: null}))
    setIsAuthenticated(true);
    setUser({name: data.name, id: data.userId, isSeller: data.isSeller, clientSelected: null})
    updateCart(data.cart);
  };

  const logout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    updateCart([]);
  };
  
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

  if (loading) {
    return <div>Loading...</div>; // Mostrar un mensaje de carga mientras verificamos el estado de autenticación
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, setUser, cart, updateCart, cantProdCart }}>
      {children}
    </AuthContext.Provider>
  );
};
