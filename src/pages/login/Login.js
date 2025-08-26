import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Alert, Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import { AuthContext } from '../../services/AuthContext'
import { userLogin } from '../../services/UserServices'
import useValidation from '../../services/useValidation'
import './Login.scss';

export default function Login() {
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
    event.stopPropagation()
    if (form.checkValidity()) {
      LogUser();
      setVisibleError(false)
    } else {
      setMessage('Completa los campos obligatorios')
      setVisibleError(true);
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
          navigate('/perfil-usuario');
        } else {
          navigate(sessionStorage.getItem('prevState')); // Redirect to dashboard
        }
      })
      .catch(err => {
        setVisibleError(true);
        setMessage(err.response.data);
      })
      .finally(() => setLoading(false));
  }

  const goToRegister = () => {
    window.location.href = "#/registro";
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <div className="form-content login">
      {loading
        ? <Spinner />
        :<>
          <Alert variant="danger" dismissible show={visibleError} onClose={() => setVisibleError(false)}>
            {message}
          </Alert>
          <div className='block login-form'>
            <div className='title-content'>
              <div className='title'>Hola!</div>
              <div className='subtitle'><span>Para seguir ingresa tu mail y clave.</span></div>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ingrese su email..."
                    value={emailValidation.value}
                    onChange={emailValidation.handleChange}
                    isInvalid={!emailValidation.isValid}
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
                    placeholder='Ingrese su contraseña...'
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
              </Row>
              <div className="btn-content">
                <Button type='submit' color="success">Ingresar!</Button>
              </div>
            </Form>
          </div>
          <div className='block login-password'>
            <div className='forgot-pass'>
              <Link to={`/olvide`}>Olvidé mi clave</Link>
            </div>
            <div className='no-account'>
              <span>Si aún no tenés clave:</span>
              <div className="btn-content">
                <Button color="success" onClick={goToRegister}>Registrate</Button>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}
