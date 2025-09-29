import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import ProductoAmpliado from "../pages/ProductoAmpliado";
import Register from "../pages/register/Register";
import RegisterConfirmPage from "../pages/register/RegisterConfirm";
import LogUser from "../pages/login/Login";
import SearchView from "../pages/SearchView";
import Cart from "../pages/cart/CartView";
import UserProfile from "../pages/profile/UserProfile";
import Checkout from "../pages/order/Checkout";
import OrderConfirmed from "../pages/order/OrderConfirmed";
import CatalogView from "../pages/CatalogView";
import UserProfileData from "../pages/profile/UserProfileData";
import UserProfileOrders from "../pages/profile/UserProfileOrders";
import ShippingData from "../components/ShippingData";
import UserProfileShipping from "../pages/profile/UserProfileShipping";
import ProtectedRoute from "../services/ProtectedRoute";
import UserProfileOrderDetais from "../pages/profile/UserProfileOrderDetails";
import Forgot from "../pages/login/Forgot";
import UserAdvertisement from "../pages/profile/UserAdvertisement";
import UserPassword from "../pages/profile/UserPassword";
import Contact from "../pages/Contact";

const RouteObject = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      //publicas
      { path: "/", element: <Home /> },
      { path: "/categoria/:categoryInfo", element: <CatalogView /> },
      { path: "/categoria/:categoryInfo/:brandInfo", element: <CatalogView /> },
      { path: "/marca/:brandInfo", element: <CatalogView /> },
      { path: "/marca/:brandInfo/:categoryInfo", element: <CatalogView /> },
      { path: "/tags/:tagInfo", element: <CatalogView />},
      { path: "/producto/:productInfo", element: <ProductoAmpliado /> },
      { path: "/registro", element: <Register /> },
      { path: "/registro-confirmado", element: <RegisterConfirmPage /> },
      { path: "/login", element: <LogUser /> },
      { path: "/olvide", element: <Forgot/> },
      { path: "/buscar/:searchTerm", element: <SearchView /> },
      { path: "/buscaDesdeAdmin/:searchTerm", element: <SearchView save={false}/> },
      { path: "/contacto", element: <Contact /> },
      // 🔒 Protegidas
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/carrito", element: <Cart /> },
          {
            path: "/perfil-usuario",
            element: <UserProfile />,
            children: [
              { path: "/perfil-usuario", element: <UserProfileData /> },
              { path: "/perfil-usuario/pedidos", element: <UserProfileOrders /> },
              { path: "/perfil-usuario/detalle_pedido/:id", element: <UserProfileOrderDetais /> },
              { path: "/perfil-usuario/detalle_pedido_finalizado/:id", element: <UserProfileOrderDetais /> },
              { path: "/perfil-usuario/envios", element: <UserProfileShipping /> },
              { path: "/perfil-usuario/anuncios", element: <UserAdvertisement /> },
              { path: "/perfil-usuario/cambiar-password", element: <UserPassword /> },
            ],
          },
          { path: "/checkout", element: <Checkout /> },
          { path: "/pedido-confirmado", element: <OrderConfirmed /> },
        ],
      },
    ],
  },
];

const router = createHashRouter(RouteObject);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
