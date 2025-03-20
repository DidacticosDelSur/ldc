import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Alert, Button, Card, CardBody, Col, Container, FloatingLabel, Form, Row } from 'react-bootstrap'
import "./Login.scss"
import { AuthContext } from '../../services/AuthContext'
import { userLogin } from '../../services/UserServices'
import useValidation from '../../services/useValidation'

const Login = () => {
  const { login } = useContext(AuthContext); // Access login function from context
  const emailValidation = useValidation('','email');
  const [userSelected, setUserSelected] = useState({
    password: ''
  })
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false)
  const [visibleError, setVisibleError] = useState(false);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      LogUser();
    }    
    setValidated(true)
  }

  const LogUser = async () => {
    var f = new FormData();
    f.append("usuario", emailValidation.value);
    f.append("password", userSelected.password);
    setLoading(true);
    userLogin(f,{type: 'cliente'})
      .then(data => {
        login(data.data); // Save data and set the login state
        if (data.data.isSeller) {
          navigate('/perfil_usuario');
        } else {
          navigate(sessionStorage.getItem('prevState')); // Redirect to dashboard
        }
      })
      .catch(err => {
        setVisibleError(true);
        setMessage(err.response.data.message);
      })
      .finally(() => setLoading(false));
  }

  const goToRegister = () => {
    window.location.href = "#/registro";
  }

  return (
    <div className="login bg-body-tertiary d-flex flex-row align-items-center">
      <Container>
      <Alert variant="danger" dismissible show={visibleError} onClose={() => setVisibleError(false)}>
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
                        isInvalid={!emailValidation.isValid}
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

export default Login
