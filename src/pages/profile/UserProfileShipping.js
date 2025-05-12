import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { editUserProfile, fetchUserData } from "../../services/UserServices";
import { Alert, Button, Col, FloatingLabel, Form, Row } from "react-bootstrap";
import ShippingData from "../../components/ShippingData";
import useValidation from "../../services/useValidation";
import React from "react";
import AutoDismissAlert from "../../components/AutoDismissAlert";

export default function UserProfileShipping() {
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
  

  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      saveUser();
    }
    setValidated(true)
  }
  
  useEffect(()=>{
    const tp = user.isSeller ? 'v' : '';
    fetchUserData(user.id,tp)
      .then((data)=>{
        setUserData(data);
        emailValidation.setValue(data.email);
        phoneValidation.setValue(data.telefono);
      })
  },[user])

  const saveUser = async () => {
    var f = new FormData();
    f.append("nombre", userData.nombre);
    f.append("apellido", userData.apellido);
    f.append("telefono", phoneValidation.value);
    f.append("provincia_id", shippingData.province_id);
    f.append("ciudad_id", shippingData.city_id);
    f.append("isSeller", user.isSeller);
    setLoading(true);
    editUserProfile(user.id, f)
      .then((data)=>{
        setLoading(false);
        setVariantMessage('success');
        setVisibleMessage(true);
        setMessage('Los datos se han guardado correctamente');
      })
      .catch((err)=>{console.log(err)})
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
      <div className="profile-header">
        <h3>Perfil</h3>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} controlId="formName">
            <FloatingLabel controlId="floatingName" label="Nombre">
              <Form.Control
                type="text"
                placeholder="Nombre"
                value={userData.nombre || ''}
                onChange={(e)=>{
                  setUserData({
                    ...userData,
                    nombre: e.target.value
                  })
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Debe ingresar un nombre.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} controlId="formLastname">
            <FloatingLabel controlId="floatingLastname" label="Apellido">
              <Form.Control
                type="text"
                placeholder="Apellido"
                value={userData.apellido || ''}
                onChange={(e)=>{
                  setUserData({
                    ...userData,
                    apellido: e.target.value
                  })
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Debe ingresar un apellido.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row className="mt-3">
        <Form.Group as={Col} controlId="formGridEmail">
            <FloatingLabel controlId="floatingEmail" label="E-mail">
              <Form.Control
                type="email"
                placeholder="E-mail"
                disabled
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
                isInvalid={!phoneValidation.isValid}
                required/>
              <Form.Control.Feedback type="invalid">
                {phoneValidation.errorMessage != '' ? phoneValidation.errorMessage : "Debe ingresar el teléfono"}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          {/* <Form.Group as={Col} controlId="formPhone">
            <FloatingLabel controlId="floatingPhone" label="Teléfono">
              <Form.Control
                type=""
                placeholder="Teléfono"
                value={userData.telefono}
                onChange={(e)=>{
                  setUserData({
                    ...userData,
                    telefono: e.target.value
                  })
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Debe ingresar un telefono.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group> */}
        </Row>
        {!user.isSeller && 
          <>
            <hr></hr>
            <h3 className="mb-3">Datos de Envío</h3>
            <ShippingData shippingData={shippingData} setShippingData={setShippingData} />
          </>
        }
        <Row className="my-3">
          <Button type='submit' color="success">Guardar</Button>
        </Row>
      </Form>
    </div>
  )
}