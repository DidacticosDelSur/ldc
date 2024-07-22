import { Component } from "react";
import "./Footer.scss";
import Logo from "../assets/logoFooter.png";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import { Envelope, Facebook, Instagram, Clock } from "react-bootstrap-icons";
import dataWeb from "../assets/images/dataweb.jpg";

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <footer>
          <div className="footer-wrapper">
            <div className="content">
              <div className="footer-content">
                <div className="module module-footer-logo">
                  <div className="logo-content">
                    <Link className="logo">
                      <Image src={Logo} />
                    </Link>
                    <div className="icons-content">
                      <a
                        className="icon"
                        href="https://www.facebook.com/libreriadelcolegio"
                        target="_blank"
                      >
                        <Facebook />
                      </a>
                      <a
                        className="icon"
                        href="https://instagram.com/libdelcolegio"
                        target="_blank"
                      >
                        <Instagram />
                      </a>
                    </div>
                  </div>
                  <h6>
                    Somos una distribuidora mayorista de libros, juegos y
                    juguetes. Estamos ubicados en Bahía Blanca, provincia de
                    Buenos Aires.
                  </h6>
                  <div className="newsletter-wrapper">
                    <div className="header">
                      <span className="icon">
                        <Envelope />
                      </span>
                      <h4>
                        Informate de nuestras últimas noticias y ofertas
                        especiales
                      </h4>
                    </div>
                    <div className="newsletter-form-wrapper">
                      <form action="?" className="newsletter-form">
                        <input
                          type="text"
                          placeholder="Tu dirección de correo electrónico"
                          className="validate[required,custom[email]]"
                        />
                        <button type="submit">Suscribirse</button>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="module module-footer menu">
                  <h3>Menú</h3>
                  <div>
                    <a href="{base_url}como-operar">Cómo operar</a>
                  </div>
                  <div>
                    <a href="{base_url}faqs">Preguntas Frecuentes</a>
                  </div>
                  <div>
                    <a href="{base_url}cbu">Datos bancarios</a>
                  </div>
                  <div>
                    <a href="{base_url}registro" className="">
                      Registrate
                    </a>
                  </div>
                  <div>
                    <a href="{base_url}terminos-condiciones">
                      Términos y Condiciones
                    </a>
                  </div>
                </div>
                <div className="module module-footer">
                  <h3>Datos de la tienda</h3>
                  <p>
                    Librería del Colegio
                    <br />
                    Zapiola 400, Bahía Blanca
                    <br />
                    Buenos Aires, Argentina.
                    <br />
                    <Clock className="icon--small" />
                    Lun a Vie de 9 a 18 hs.
                    <br />
                    <br />
                    Llamenos
                    <br />
                    <a href="https://wa.me/542915371157" target="_blank">
                      +54 291 537 1157
                    </a>
                    <br />
                    Escribanos un correo electrónico:
                    <br />
                    <a href="mailto:tienda.libdelcol@gmail.com">
                      tienda.libdelcol@gmail.com
                    </a>
                    <br />
                  </p>
                </div>
              </div>

              <div className="copyright">
                <p>Todos los derechos reservados ®. 2019-2024</p>
                <p>
                  <a
                    href="http://qr.afip.gob.ar/?qr=aNjSu-6x_oJPssWeerj_Eg,,"
                    target="_F960AFIPInfo"
                  >
                    <Image src={dataWeb} />
                  </a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    );
  }
}

export default Footer;
