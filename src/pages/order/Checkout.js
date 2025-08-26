import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import CartResume from "../../components/cart/CartResume";
import { fetchCityListData, fetchProvinceListData } from "../../services/GeoServices";
import { createOrder } from "../../services/OrderServices";
import { getShippingData } from "../../services/ShippingServices";

export default function Checkout() {
  const [validated, setValidated] = useState(false);
  const { user, isAuthenticated, updateOrder, updateCart } = useContext(AuthContext);
  const [ shippingData, setShippingData ] = useState({province_id: 0});
  const [ provinces, setProvinces ] = useState([]);
  const [ cities, setCities ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const [ message, setMessage ] = useState('');

  if (!isAuthenticated) {
    window.location.href = "#/";
  }
  
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      newOrder();
    } else {
      setVisible(true);
      setMessage('Falta completar el formulario.')
    }

    setValidated(true);
  };

  useEffect(()=>{
    const client = user.isSeller ? user.clientSelected : user.id;
    getShippingData({id: client})
      .then((data) => {
        console.log(data);
        setShippingData({
          ...shippingData, 
          province_id: Number(data.provincia_id),
          city_id:  Number(data.ciudad_id)
        })
      })
  }, [user]);

  useEffect(()=>{
    if (shippingData.province_id > 0) {
      fetchCityListData(shippingData.province_id)
      .then((data) => {
        setCities(data);
      })
      .catch(err => console.log(err))
      .finally(() => {setLoading(false)});
    }
  },[shippingData.province_id])

  useEffect(() => {
    window.scrollTo(0,0);
    fetchProvinceListData()
      .then((data) => {
        setProvinces(data);
      })
      .catch(err => console.log(err))
  }, []);

  const newOrder = async () => {
    var f = new FormData();
    f.append("direccion", shippingData.address);
    f.append("observaciones", shippingData.observations);
    f.append("provincia_id", shippingData.province_id);
    f.append("ciudad_id", shippingData.city_id);
    if (user.isSeller && user.clientSelected) {
      f.append("cliente_id", user.clientSelected);
    }
    setLoading(true);
    createOrder(f, {user: user.id})
      .then((data) => {
        setVisible(false);
        updateOrder(data.data)
        //updateCart([]);
        window.location.href = "#/pedido-confirmado"
      })
      .catch((err) => {
        setVisible(true);
        setMessage(err.response.data);
      })
      .finally(() => {setLoading(false)});
  }

  return (
    <>
      <div className="purple-header">
        <div className='content'>
          <div className='title'>Datos de envío{/*  ({cantProdCart}) */}</div>
          <div className='subtitle'>Ingresa los datos de envío y confirmá tu pedido</div>
        </div>
      </div>
      <div className='cart-container'>
        <div className="content">
          {loading ?
            <div className='content-loading'>
              <Spinner variant="success" />
            </div>
            :
            <>
              <Alert variant="danger" dismissible show={visible} onClose={() => setVisible(false)}>
                {message}
              </Alert>
              <div className='cart-details'>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridState">
                        <FloatingLabel
                          controlId="floatingState"
                          label="Provincia"
                          className="mb-3"
                        >
                          <Form.Select
                            required
                            value={shippingData.province_id}
                            onChange={(e) => {
                              setShippingData({
                                ...shippingData, 
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
                          value={shippingData.city_id}
                          onChange={(e) => {
                            setShippingData({
                              ...shippingData, 
                              city_id: Number(e.target.value)
                            })
                          }}
                          disabled={shippingData.province_id == 0}>
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
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridName">
                        <FloatingLabel
                          controlId="floatingName"
                          label="Dirección de Envío"
                          className="mb-3"
                        >
                          <Form.Control
                            type="text"
                            placeholder='Dirección de envío'
                            onChange={(e) => {
                              setShippingData({
                                ...shippingData,
                                address: e.target.value,
                              });
                            }}
                            required/>
                          <Form.Control.Feedback type="invalid">
                            Ingresa una dirección.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                        
                      </Form.Group>
                    </Row>
                    <Row className="mb-5">
                      <Form.Group as={Col} controlId="formGridObservations">
                        <FloatingLabel controlId="floatingObservations" label="Observaciones del Pedido">
                          <Form.Control
                            type="text"
                            as="textarea"
                            placeholder="Observaciones"
                            onChange={(e) => {
                              setShippingData({
                                ...shippingData,
                                observations: e.target.value,
                              });
                            }}
                          />
                        </FloatingLabel>
                      </Form.Group>
                    </Row>
                    <div className="btn-content left">
                      <Button type='submit' variant="third">Confirmar Compra</Button>
                    </div>
                  </Form>
              </div>
              <CartResume shippingMode={true}/>
            </>
          }
        </div>
      </div>
    </>
  )
}