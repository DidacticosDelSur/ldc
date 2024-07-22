import { Component } from "react";
import "./WhatsApp.scss";
import { Whatsapp } from "react-bootstrap-icons";

class WhatsApp extends Component {
  render() {
    return (
      <a
        href="https://api.whatsapp.com/send?phone=+542915371157&text=Hola!%20Me%20contacto%20desde%20la%20p%C3%A1gina%20web.%20"
        target="_blank"
      >
        <div class="whatsApp">
          <Whatsapp className="icon" />
          <div class="text">
            <div class="title">Consultanos ahora!</div>
            <div>Escribinos por Whatsapp</div>
          </div>
        </div>
      </a>
    );
  }
}
export default WhatsApp;
