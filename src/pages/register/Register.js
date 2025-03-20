import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'

import "./Register.scss"
import { fetchCityListData, fetchProvinceListData } from '../../services/GeoServices';
import useValidation from '../../services/useValidation';
import { createUser } from '../../services/UserServices';

const Register = () => {
  const [ provinces, setProvinces ] = useState([]);
  const [ cities, setCities ] = useState([]);
  const [ provinceId, setProvinceId ] = useState(0);
  const phoneValidation = useValidation('','phone');
  const emailValidation = useValidation('','email');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    setLoading(true);
    createUser(f,'c')
      .then(data => {
        window.location.href = "#/registro-confirmado";
      })
      .catch(err => {
        setVisible(true);
        setMessage(err.response.data.message);
      })
      .finally(() => setLoading(false));
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      create();
    }

    setValidated(true);
  };

  const handlePasswordConfirm = (e) => {
    if (userSelected.password === e.target.value) {
      setUserSelected({
        ...userSelected,
        passwordConfirm: e.target.value,
      });
    } else {
      setShowPasswordError(true);
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
    fetchProvinceListData()
      .then((data) => {
        setProvinces(data);
      })
      .catch(err => console.log(err))
      .finally(() => {setLoading(false)});
  }, []);

  return (
    <div className="bg-body-tertiary d-flex flex-row align-items-center">
      <Container> 
        <Alert variant="danger" dismissible show={visible} onClose={() => setVisible(false)}>
          {message}
        </Alert>
        <Row className="justify-content-center">
          <Col md={9} lg={7} xl={6}>
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <h1>Registrate</h1>
                  <p className="text-body-secondary">Registrate para poder realizar las compras que quieras</p>
                  <p className="text-body-secondary">Solo ventas mayoristas a comercios, empresas o instituciones.</p>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridName">
                      <FloatingLabel
                        controlId="floatingName"
                        label="Nombre"
                        className="mb-3"
                      >
                        <Form.Control
                          type="text"
                          placeholder='Nombre'
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
                      </FloatingLabel>
                      
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridLastname">
                      <FloatingLabel controlId="floatingLastname" label="Apellido">
                        <Form.Control
                          type="text"
                          placeholder="Apellido"
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
                      </FloatingLabel>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPhone">
                      <FloatingLabel
                        controlId="floatingPhone"
                        label="Teléfono/WhatsApp"
                        className="mb-3"
                      >
                        <Form.Control 
                          type="number"
                          placeholder='Teléfono/WhatsApp'
                          value={phoneValidation.value}
                          onChange={phoneValidation.handleChange}
                          invalid={!phoneValidation.isValid}
                          required/>
                        <Form.Control.Feedback type="invalid">
                         {phoneValidation.errorMessage != '' ? phoneValidation.errorMessage : "Debe ingresar el teléfono"}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridEmail">
                      <FloatingLabel controlId="floatingEmail" label="E-mail">
                        <Form.Control
                          type="email"
                          placeholder="E-mail"
                          value={emailValidation.value}
                          onChange={emailValidation.handleChange}
                          invalid={!emailValidation.isValid}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                         {emailValidation.errorMessage != '' ? emailValidation.errorMessage : "Debe ingresar el e-mail"}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridPassword">
                      <FloatingLabel
                        controlId="floatingPassword"
                        label="Contraseña"
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder='Contraseña'
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
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridConfirmPassword">
                      <FloatingLabel controlId="floatingConfirmPassword" label="Confirmar Contraseña">
                        <Form.Control
                          type="password"
                          placeholder="Contraseña"
                          onChange={handlePasswordConfirm}
                          minLength={8}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                         {showPasswordError ? 'Las contraseñas no coinciden.' : "Debe ingresar una contraseña. Debe tener mínimo 8 caracteres."}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridState">
                      <FloatingLabel
                        controlId="floatingState"
                        label="Provincia"
                        className="mb-3"
                      >
                        <Form.Select
                          required
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
                      </FloatingLabel>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                      <FloatingLabel controlId="floatingCity" label="Ciudad">
                      <Form.Select
                        required
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
                      </FloatingLabel>
                    </Form.Group>
                  </Row>

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
                  <div className="d-grid">
                    <Button type='submit' color="success">Crear Cuenta</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
