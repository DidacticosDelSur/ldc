import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import "./Contact.scss"
import useValidation from "../services/useValidation";
import { Facebook, Instagram } from "react-bootstrap-icons";
import { sendMessageToAdmin } from "../services/ContactServices";
import { data } from "jquery";

export default function Contact(){
  const [ visible, setVisible ] = useState(false);
  const [ validated, setValidated ] = useState(false);
  const [ message, setMessage ] = useState('');
  const [ variant, setVariant ] = useState()
  const [ loading, setLoading ] = useState(false);
  const [ contactData, setContactData ] = useState({});
  const emailValidation = useValidation('','email');
  const phoneValidation = useValidation('','phone');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      sendMessage()
    } else {
      setVisible(true)
      setMessage("Complete los campos obligatorios")
      setVariant('danger')
    }
    setValidated(true)
  }

  const sendMessage = () => {
    var f = new FormData();
    f.append("nombre", contactData.name);
    f.append("apellido", contactData.lastname);
    f.append("telefono", phoneValidation.value);
    f.append("email", emailValidation.value);
    f.append("localidad", contactData.city)
    f.append("comentario", contactData.message);
    setLoading(true)
    sendMessageToAdmin(f)
    .then(resp => {
      setContactData({})
      phoneValidation.setValue()
      emailValidation.setValue()
      setMessage(resp.data)
      setVisible(true)
      setVariant('success')
      setValidated(false)
    })
    .catch((err) => {
      setVariant('danger')
      setMessage(err.response.data)
      setVisible(true)
    })
    .finally(()=>{setLoading(false)})
  }

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  return(
    <div className="form-content contact">
      <Alert variant={variant} dismissible show={visible} onClose={() => setVisible(false)}>
        {message}
      </Alert>
      {loading
        ? <Spinner />
        :<>
          <div className="block contact-form">
            <div className='title-content'>
              <div className='title'>Contactanos</div>
              <div className='subtitle'>Escribinos y responderemos a la brevedad.</div>
            </div>
            <div className="contact-body">
              <Row>
                <Col>
                  <div className="title">Escribinos</div>
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder='Ingrese su nombre...'
                        value={contactData.name}
                        onChange={(e) => {
                          setContactData({
                            ...contactData,
                            name: e.target.value,
                          });
                        }}
                        required/>
                      <Form.Control.Feedback type="invalid">
                        Ingresa un nombre.
                      </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridLastname">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder='Ingrese su apellido...'
                          value={contactData.lastname}
                          onChange={(e) => {
                            setContactData({
                              ...contactData,
                              lastname: e.target.value,
                            });
                          }}
                          required/>
                        <Form.Control.Feedback type="invalid">
                          Ingresa un apellido.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Ingrese su email..."
                          value={emailValidation.value}
                          onChange={emailValidation.handleChange}
                          invalid={!emailValidation.isValid}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {emailValidation.errorMessage != '' ? emailValidation.errorMessage : "Debe ingresar el e-mail"}
                        </Form.Control.Feedback>
                    </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridPhone">
                        <Form.Label>Teléfono/WhatsApp</Form.Label>
                        <Form.Control 
                          type="number"
                          placeholder='Ingrese su teléfono/whatsApp...'
                          value={phoneValidation.value}
                          onChange={phoneValidation.handleChange}
                          invalid={!phoneValidation.isValid}
                          required/>
                        <Form.Control.Feedback type="invalid">
                          {phoneValidation.errorMessage != '' ? phoneValidation.errorMessage : "Debe ingresar el teléfono"}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Localidad</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder='Ingrese una ciudad...'
                          value={contactData.city}
                          onChange={(e) => {
                            setContactData({
                              ...contactData,
                              city: e.target.value,
                            });
                          }}/>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridMessage">
                        <Form.Label>Mensaje</Form.Label>
                        <Form.Control
                          as="textarea"
                          row={3}
                          placeholder='Ingrese un mansaje...'
                          value={contactData.message}
                          onChange={(e) => {
                            setContactData({
                              ...contactData,
                              message: e.target.value,
                            });
                          }}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Ingresa un mensaje.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <div className="btn-content">
                      <Button type='submit' className="small" color="success">Enviar</Button>
                    </div>
                    </Row>
                  </Form>
                </Col>
                <Col>
                  <div className="title">Datos de Contacto</div>
                  <Row>
                    <Col>
                      <div className="contact-item">
                        <div className="title">Dirección</div>
                        <div className="data">Zapiola y 11 de Abril <br/>BahÍa Blanca, Buenos Aires, Argentina</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="contact-item">
                        <div className="title">Email</div>
                        <div className="data">info@libreriadelcolegio.com</div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="contact-item">
                        <div className="title">Teléfono</div>
                        <div className="data">+54 291 5371157</div>
                      </div>
                    </Col>
                    <Col>
                      <div className="contact-item">
                        <div className="title">Redes Sociales</div>
                        <div className="data">
                          <a
                            className="icon"
                            href="https://instagram.com/libdelcolegio"
                            target="_blank"
                          >
                            <Instagram />
                          </a>
                          <a
                            className="icon"
                            href="https://www.facebook.com/libreriadelcolegio"
                            target="_blank"
                          >
                            <Facebook />
                          </a>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d9674.804906191808!2d-62.26577837281307!3d-38.71704857926758!3m2!1i1024!2i768!4f13.1!2m1!1sLIBRER%C3%8DA%20DEL%20COLEGIO!5e0!3m2!1ses!2sar!4v1756230523644!5m2!1ses!2sar"
                      height="350"
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"></iframe>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </>
      }
    </div>
  )
}