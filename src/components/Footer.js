import { Component, useState } from "react";
import "./Footer.scss";
import Logo from "../assets/LOGO_FOOTER.png";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Image, InputGroup } from "react-bootstrap";
import { Envelope, Facebook, Instagram, Clock } from "react-bootstrap-icons";
import dataWeb from "../assets/images/dataweb.jpg";
import useValidation from "../services/useValidation";
import { addToNewletter } from "../services/NewsletterServices";

export default function Footer() {
  const [validated, setValidated] = useState(false);
  const emailValidation = useValidation('','email');
  const [emailAdded, setEmailAdded] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity()) {
      addToNewsletter();
    }
    setValidated(true)
  }

  const addToNewsletter = () => {
    var f = new FormData();
    f.append("email", emailValidation.value);
    addToNewletter(f)
    .then(()=>{
      setEmailAdded(true)
    })
    .catch(err=>{console.log(err)})
  }

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
                    {!emailAdded
                      ? <Form noValidate validated={validated} onSubmit={handleSubmit}  className="newsletter-form">
                          <FormGroup>
                            <Form.Control
                              type="email"
                              value={emailValidation.value}
                              onChange={emailValidation.handleChange}
                              isInvalid={!emailValidation.isValid}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              {emailValidation.errorMessage != '' ? emailValidation.errorMessage : "Debe ingresar el e-mail"}
                            </Form.Control.Feedback>
                          </FormGroup>
                          
                            <button type="submit">Suscribirse</button>
                        </Form>
                      : <h3>Gracias</h3>
                    }
                  </div>
                </div>
              </div>
              <div className="module module-footer">
                <h3>Menú</h3>
                <Link to={'/como-operar'}>Cómo operar</Link>
                <Link to={'/faqs'}>Preguntas Frecuentes</Link>
                <Link to={'/cbu'}>Datos bancarios</Link>
                <Link to={'/registro'}>Registrate</Link>
                <Link to={'/terminos-condiciones'}> Términos y Condiciones</Link>
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
              <p>Todos los derechos reservados ®. 2019-2025</p>
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
  )
}