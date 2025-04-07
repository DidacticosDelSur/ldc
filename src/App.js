import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";
import "./assets/scss/Content.scss";

import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";
import { AuthContext } from "./services/AuthContext";
import { useContext, useEffect } from "react";

function App() {
  const { isAuthenticated, user, updateOrder } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // Guardar la URL actual en sessionStorage cada vez que cambie la URL
    const currentState = location.pathname;
    let prevState = sessionStorage.getItem('currentState');
    const prev = sessionStorage.getItem('prevState');
    if (currentState != '/registro') {
      if (currentState != prevState) {
        //resetPages();
        if (prevState == '/login') {
          prevState = sessionStorage.getItem('prevLogin');
        }
        sessionStorage.setItem('prevState', prevState);
        sessionStorage.setItem('currentState', currentState);
        if (currentState == '/login') {
          sessionStorage.setItem('prevLogin', prev)
        }
        if (prevState == '/pedido_confirmado') {
          updateOrder({});
        }
      }
    }
    
  }, [location]);

  return (
    <>
      <div className="App">
        <Header authenticated={isAuthenticated} user={user ? user.name: ''}/>
        <div className="App-content">
          <Outlet />
        </div>
        <WhatsApp />
        <Footer />
      </div>
    </>
  );
}

export default App;
