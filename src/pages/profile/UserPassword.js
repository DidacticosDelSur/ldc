import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { editUserPassword, editUserProfile, fetchUserData } from "../../services/UserServices";
import { Alert, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import ShippingData from "../../components/ShippingData";
import useValidation from "../../services/useValidation";
import React from "react";
import AutoDismissAlert from "../../components/AutoDismissAlert";
import { Pass } from "react-bootstrap-icons";

export default function UserPassword() {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [validated, setValidated] = useState(false);
  const [ shippingData, setShippingData ] = useState({province_id: 0});
  const [loading, setLoading] = useState(false);
  const phoneValidation = useValidation('','phone');
  const emailValidation = useValidation('','email');
  const [variantMessage, setVariantMessage] = useState('');
  const [visibleMessage, setVisibleMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [showPasswordError, setShowPasswordError ] = useState(false);
  

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    if (form.checkValidity()) {
      savePassword();
    }
    setValidated(true)
  }
  
  const handlePasswordConfirm = (e) => {
    const value = e.target.value;
    setUserData({
      ...userData,
      passwordConfirm: value,
    });

    // Mostrar error solo si ya escribió algo y no coincide
    if (userData.assword && userData.newPassword !== value) {
      setShowPasswordError(true);
    } else {
      setShowPasswordError(false);
    }
  }

  const savePassword = async () => {
    var f = new FormData();
    f.append('isSeller', user.isSeller)
    f.append("password", userData.password);
    f.append("passwordConfirm", userData.newPassword);
    setLoading(true);
    editUserPassword(user.id, f)
      .then((data)=>{
        setLoading(false);
        setVariantMessage('success');
        setVisibleMessage(true);
        setMessage('Los datos se han guardado correctamente');
      })
      .catch((err)=>{
        setVariantMessage('danger')
        setMessage(err.response.data)
        setVisibleMessage(true)
        console.log(err)})
      .finally(()=>{setLoading(false)})
  }

  return (
    <div>
      {visibleMessage && 
        <AutoDismissAlert
          variant={variantMessage}
          message={message}
          duration={4000}
          show={visibleMessage} 
          onClose={() => setVisibleMessage(false)} />
      }
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md={6} controlId="formName">
            <FloatingLabel controlId="floatingName" label="Contraseña Actual" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                value={userData.password || ''}
                onChange={(e)=>{
                  setUserData({
                    ...userData,
                    password: e.target.value
                  })
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Debe ingresar la contraseña.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPassword">
            <FloatingLabel controlId="newPass" label="Nueva Contraseña" className="mb-3">
              <Form.Control
                type="password"
                placeholder='Ingrese una contraseña...'
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    newPassword: e.target.value,
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
            <FloatingLabel controlId="confirmPass" label="Confirmar Contraseña" className="mb-3">
              <Form.Control
                type="password"
                placeholder="Ingrese nuevamente la contraseña..."
                onChange={handlePasswordConfirm}
                minLength={8}
                isInvalid={showPasswordError}
                required
              />
              <Form.Control.Feedback type="invalid">
                {showPasswordError ? 'Las contraseñas no coinciden.' : "Debe ingresar una contraseña. Debe tener mínimo 8 caracteres."}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <div className="btn-content my-3">
          <Button type='submit' variant="third">Guardar</Button>
        </div>
      </Form>
    </div>
  )
}