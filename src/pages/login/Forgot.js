import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import useValidation from "../../services/useValidation";
import './Login.scss'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { recoverPassword } from "../../services/UserServices";

export default function Forgot () {
  const emailValidation = useValidation('','email');
  const [visibleError, setVisibleError] = useState(false);
  const [message, setMessage] = useState();
  const [validated, setValidated] = useState(false)
  const [typeMessege, setTypeMessege] = useState();
  const [ loading, setLoading ] = useState(false)

  const navidate = useNavigate()

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity()) {
      Recover();
      setVisibleError(false)
    } else {
      setMessage('Completa los campos obligatorios')
      setVisibleError(true);
      setTypeMessege('danger')
    }
    setValidated(true)
  }

  const Recover = () => {
    setLoading(true)
    recoverPassword(emailValidation.value)
    .then(data=>{
      setMessage(data)
      setTypeMessege('success')
      setVisibleError(true)
    })
    .catch((err)=>{
      setMessage(err.data)
      setVisibleError(true)
      setTypeMessege('danger')
    })
    .finally(()=>{setLoading(false)})
    ;
  }

  const goToRegister = () => {
    navidate("/registro");
  }

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])

  return (
    <div className="form-content login">
      <Alert variant={typeMessege} dismissible show={visibleError} onClose={() => setVisibleError(false)}>
        {message}
      </Alert>
      {loading
        ? <Spinner />
        :<>
          <div className='block login-form'>
            <div className='title-content'>
              <div className='title'>Olvidaste tu clave?</div>
              <div className='subtitle'>Podes recuperarla por mail.</div>
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

              <div className="btn-content">
                <Button type='submit' color="success">Recuperar Clave!</Button>
              </div>
            </Form>
          </div>
          <div className='block login-password'>
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