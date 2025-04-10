import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import App from "../App";
//import App from "../pages/App";
import Home from "../pages/Home";
//import Pdf from "../pages/Pdf";
import ErrorPage from "../pages/ErrorPage";
//import ProductoList from "../components/ProductList";
import ProductoAmpliado from "../pages/ProductoAmpliado";
//import BrandView from "../pages/BrandView";
//import CategoryView from "../pages/CategoryView";
import Register from "../pages/register/Register";
import RegisterConfirmPage from "../pages/register/RegisterConfirm";
import LogUser from "../pages/login/Login";
import SearchView from "../pages/SearchView";
import Cart from "../pages/CartView";
import UserProfile from "../pages/UserProfile";
import Checkout from "../pages/order/Checkout";
import OrderConfirmed from "../pages/order/OrderConfirmed";
import CatalogView from "../pages/CatalogView";
/*import CoockiePolicy from "../pages/CookiePolicy";
import Groups from "../pages/administration/Groups";
import Users from "../pages/administration/Users";
import UserList from "../pages/administration/Users/UserList";
import AddEditUser from "../pages/administration/Users/AddEditUser";
import GroupList from "../pages/administration/Groups/GroupList";
import Graphics from "../pages/administration/Graphics";
import GraphicList from "../pages/administration/Graphics/GraphicList";
import AddEditGraphic from "../pages/administration/Graphics/AddEditGraphic";
import AddEditGroup from "../pages/administration/Groups/AddEditGroup";
import HelpDesk from "../pages/HelpDesk";*/
/*import Faqs from "../pages/Faqs";
import ContentProvider from "../pages/ContentProvider"; 
import WorkshopsPage from "../pages/WorkshopsPage";
import MemberShipPage from "../pages/Membership"; */

const RouteObject = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categoria/:categoryInfo",//categoryInfo
        element: <CatalogView />
        //element: <CategoryView />
      },
      {
        path: "/categoria/:categoryInfo/:brandInfo",
        element: <CatalogView />
       // element: <CategoryView />
      },
      {
        path: "/marca/:brandInfo",
        element: <CatalogView />,
       // element: <BrandView />,
      },
      {
        path: "/marca/:brandInfo/:categoryInfo",
        element: <CatalogView />,
       // element: <BrandView />,
      },
      {
        path: "/producto/:productInfo",
        element: <ProductoAmpliado />
      },
      {
        path: "/registro",
        element: <Register />,
      },
      {
        path: "/registro-confirmado",
        element: <RegisterConfirmPage />,
      },
      {
        path: "/login",
        element: <LogUser />,
      },
      {
        path: "/buscar/:searchTerm",
        element: <SearchView />,
      },
      {
        path: "/carrito",
        element: <Cart />,
      },
      {
        path: "/perfil-usuario",
        element: <UserProfile />
      },
      {
        path: "/checkout",
        element: <Checkout />
      },
      {
        path: "/pedido-confirmado",
        element: <OrderConfirmed />
      }
       /*{
        path: "/groups",
        element: <Groups />,
        children: [
          {
            path: "",
            element: <GroupList />,
          },
          {
            path: "new",
            element: <AddEditGroup />,
          },
          {
            path: "edit/:id",
            element: <AddEditGroup />,
          },
        ],
      },
      {
        path: "users",
        element: <Users />,
        children: [
          {
            path: "",
            element: <UserList />,
          },
          {
            path: "new",
            element: <AddEditUser />,
          },
          {
            path: "edit/:id",
            element: <AddEditUser />,
          },
        ],
      },
      {
        path: "graphics",
        element: <Graphics />,
        children: [
          {
            path: "",
            element: <GraphicList />,
          },
          {
            path: "new",
            element: <AddEditGraphic />,
          },
          {
            path: "edit/:id",
            element: <AddEditGraphic />,
          },
        ],
      }, */
    ],
  },
  /*{
    path: "/users",
    element: <Users />,
    children: [
      {
        path: "/list",
        element: <UserList />,
      },
    ],
  },

 {
    path: "/tyc",
    element: <Pdf name="terminos_y_condiciones.pdf" />,
  },
  {
    path: "/workshops",
    element: <WorkshopsPage />,
  },
  {
    path: "/membership",
    element: <MemberShipPage />,
  }, */
];

const router = createHashRouter(RouteObject);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
