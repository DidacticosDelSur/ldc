import { useEffect, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Form, Row, Spinner } from 'react-bootstrap'

import "./Register.scss"
import { fetchCityListData, fetchProvinceListData } from '../../services/GeoServices';
import useValidation from '../../services/useValidation';
import { createUser } from '../../services/UserServices';

export default function Register() {
  const [ provinces, setProvinces ] = useState([]);
  const [ cities, setCities ] = useState([]);
  const phoneValidation = useValidation('','phone');
  const emailValidation = useValidation('','email');
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false)
  const [userSelected, setUserSelected] = useState({
    name: '',
    lastname: '',
    province_id: 0,
    city_id: '',
    subscribe: false,
    terms: false,
    password: '',
    passwordConfirm: ''
  })
  const [message, setMessage] = useState(''); 
  const [visible, setVisible] = useState(false);
  const [showPasswordError, setShowPasswordError ] = useState(false);

  const create = async () => {
    var f = new FormData();
    f.append("nombre", userSelected.name);
    f.append("apellido", userSelected.lastname);
    f.append("email", emailValidation.value);
    f.append("password", userSelected.password);
    f.append("passwordConfirm", userSelected.passwordConfirm);
    f.append("telefono", phoneValidation.value);
    f.append("provincia_id", userSelected.province_id);
    f.append("ciudad_id", userSelected.city_id);
    f.append("susbcribe", userSelected.setVisible ? 1 : 0);
    f.append("terms", userSelected.terms ? 1 : 0);
    setVisible(false);
    setLoading(true);
    createUser(f,'c')
      .then(data => {
        window.location.href = "#/registro-confirmado";
      })
      .catch(err => {
        setVisible(true);
        setMessage(err.response.data);
      })
      .finally(() => setLoading(false)); 
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      create();
    } else {
      setMessage('Completa los campos obligatorios')
      setVisible(true);
    }
    setValidated(true);
  };

  const handlePasswordConfirm = (e) => {
    const value = e.target.value;
    setUserSelected({
      ...userSelected,
      passwordConfirm: value,
    });

    if (userSelected.password && userSelected.password !== value) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }
  }

  useEffect(()=>{
    if (userSelected.province_id > 0) {
      fetchCityListData(userSelected.province_id)
      .then((data) => {
        setCities(data);
      })
      .catch(err => console.log(err))
      .finally(() => {setLoading(false)});
    }
  },[userSelected.province_id])

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProvinceListData()
      .then((data) => {
        setProvinces(data);
      })
      .catch(err => console.log(err))
      .finally(() => {setLoading(false)});
  }, []);

  return (
    <div className="form-content register">
      <Alert variant="danger" dismissible show={visible} onClose={() => setVisible(false)}>
        {message}
      </Alert>
      {loading
        ? <Spinner />
        : <>
            <div className='block register-form'>
              <div className='title-content'>
                <div className='title'>Registrate</div>
                <div className='subtitle'>Registrate para poder realizar las compras que quieras.<br />
                <span>Solo ventas mayoristas a comercios, empresas o instituciones.</span></div>
              </div>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder='Ingrese su nombre...'
                      value={userSelected.name}
                      onChange={(e) => {
                        setUserSelected({
                          ...userSelected,
                          name: e.target.value,
                        });
                      }}
                      required/>
                    <Form.Control.Feedback type="invalid">
                      Ingresa un nombre.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridLastname">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su apellido..."
                      value={userSelected.lastname}
                      onChange={(e) => {
                        setUserSelected({
                          ...userSelected,
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
                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder='Ingrese una contraseña...'
                      value={userSelected.password}
                      onChange={(e) => {
                        setUserSelected({
                          ...userSelected,
                          password: e.target.value,
                        });
                      }}
                      minLength={8}
                      required
                      />
                      <Form.Control.Feedback type="invalid">
                      Debe ingresar una contraseña. Debe tener mínimo 8 caracteres.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridConfirmPassword">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Ingrese nuevamente la contraseña..."
                      value={userSelected.passwordConfirm}
                      onChange={handlePasswordConfirm}
                      minLength={8}
                      isInvalid={showPasswordError}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {showPasswordError ? 'Las contraseñas no coinciden.' : "Debe ingresar una contraseña. Debe tener mínimo 8 caracteres."}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Select
                      required
                      placeholder="Elija su provincia..."
                      value={userSelected.province_id}
                      onChange={(e) => {
                        setUserSelected({
                          ...userSelected, 
                          province_id: Number(e.target.value),
                          city_id: 0
                        })
                      }}>
                      <option></option>
                      {provinces.length > 0 && 
                        provinces.map((item) => {
                          return <option key={`prov_${item.id}`} value={item.id}>{item.nombre}</option>
                        })
                      }
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Debe elegir una provincia.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Select
                      required
                      placeholder="Elija su ciudad..."
                      value={userSelected.city_id}
                      onChange={(e) => {
                        setUserSelected({
                          ...userSelected, 
                          city_id: Number(e.target.value)
                        })
                      }}
                      disabled={userSelected.province_id == 0}>
                        <option></option>
                        {cities.length > 0 && 
                          cities.map((item) => {
                            return <option key={`city_${item.id}`} value={item.id}>{item.nombre}</option>
                          })
                        }
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Debe elegir una ciudad.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className='register-footer'>
                  <Row>
                    <div className='note'>
                      Una vez completado el formulario recibirá un correo electrónico en su casilla de mail para confirmar su registración.
                      Si el mismo no llega, como primer paso busque en Correo no deseado o SPAM.
                      De no encontrarlo, comuníquese con nosotros a info@libreriadelcolegio.com y nos ocuparemos de activar la cuenta.
                    </div>
                  </Row>
                  <div>
                    <Row>
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="formGridSubscribe"
                        label="Deseo suscribirme a la newsletter"
                        checked={userSelected.subscribe}
                        onChange={(e) => {
                          setUserSelected({
                            ...userSelected, 
                            subscribe: e.target.value
                          })
                        }}
                      />
                    </Row>
                    <Row>
                      <Form.Check // prettier-ignore
                        type="checkbox"
                        id="formGridTerminos"
                        label="He leido y acepto los términos y condiciones"
                        checked={userSelected.terms}
                        onChange={(e) => {
                          setUserSelected({
                            ...userSelected, 
                            terms: e.target.value
                          })
                        }}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Debe aceptar los terminos y condiciones.
                      </Form.Control.Feedback>
                    </Row>
                  </div>
                  <div className="btn-content">
                    <Button type='submit' color="success">Crear Cuenta</Button>
                  </div>
                </div>
              </Form>
            </div>
          </>
      }
    </div>
  )
}