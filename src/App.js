import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import "./App.scss";
import Footer from "./components/Footer";
import WhatsApp from "./components/WhatsApp";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
        <Outlet />
      </div>
      <WhatsApp />
      <Footer />
    </div>
  );
}

export default App;
