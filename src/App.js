import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import "./App.scss";
import "./assets/scss/Content.scss";

import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";
import { AuthContext } from "./services/AuthContext";
import { useContext, useEffect } from "react";
import RouteChangeTracker from "./routes/RouteChangeTracker";

function App() {
  const { isAuthenticated, user, updateOrder } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // Guardar la URL actual en sessionStorage cada vez que cambie la URL
    const currentState = location.pathname;
    const prevState = sessionStorage.getItem('currentState');
    if (currentState != prevState) {
      sessionStorage.setItem('prevState', prevState);
      sessionStorage.setItem('currentState', currentState);
      if (prevState == '/pedido_confirmado') {
        updateOrder({});
      }
    }
    
  }, [location]);

  return (
    <>
      <RouteChangeTracker />
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
