import React, { useContext, useState } from 'react'
import { Alert, Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'

import "./Login.scss"
import useValidation from '../../services/useValidation';
import { userLogin } from '../../services/UserServices';
import { AuthContext } from '../../services/AuthContext'
import { useNavigate } from 'react-router-dom';

const LogUser = () => {
  const { login } = useContext(AuthContext); // Access login function from context
  
  const emailValidation = useValidation('','email');
  
  const [validated, setValidated] = useState(false)
  const [userSelected, setUserSelected] = useState({
    password: ''
  })
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const Loguear = async () => {
    var f = new FormData();
    f.append("usuario", emailValidation.value);
    f.append("password", userSelected.password);
    setLoading(true);
    userLogin(f,{type: 'cliente'})
      .then(data => {
        setVisible(false);
        const token = data.data.token; // Assume token is returned on successful login
        const name = data.data.name; // Assume token is returned on successful login
        login(token,name); // Save token and set the login state
        navigate('/'); // Redirect to dashboard
      })
      .catch(err => {
        setVisible(true);
        setMessage(err.response.data.message);
      })
      .finally(() => setLoading(false));
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      Loguear();
    }

    setValidated(true);
  };

  const goToRegister = () => {
    window.location.href = "#/registro";
  }

  return (
    <div className="bg-body-tertiary d-flex flex-row align-items-center">
      <Container> 
      <Alert variant="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
        {message}
      </Alert>
        <Row className="justify-content-center">
          <Col md={9} lg={7} xl={6}>
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <h1>Hola</h1>
                  <p className="text-body-secondary">Para seguir ingresa tu clave</p>
                  <Row className="mb-3">
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
                  </Row>
                  <div className="d-grid">
                    <Button type='submit' color="success">Ingresar</Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
              <Card className='mx-4 mt-4'>
                <CardBody>
                  <Button color='success' onClick={goToRegister}>Registrate aquí</Button>
                </CardBody>
              </Card>
              </Col>
        </Row>
      </Container>
    </div>
  )
}

export default LogUser
