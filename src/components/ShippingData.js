import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { getShippingData } from "../services/ShippingServices";
import { fetchCityListData, fetchProvinceListData } from "../services/GeoServices";
import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

export default function ShippingData({shippingData, setShippingData}) {
  const { user } = useContext(AuthContext);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  //const [ shippingData, setShippingData ] = useState({province_id: 0});

  useEffect(()=>{
    const client = user.isSeller ? user.clientSelected : user.id;
    getShippingData({id: client})
      .then((data) => {
        setShippingData({
          ...shippingData,
          province_id: Number(data.provincia_id),
          city_id:  Number(data.ciudad_id),
          zip_code: Number(data.codigo_postal)
        })
      })
      .catch(err => console.log(err));
  }, [user]);

  useEffect(()=>{
    if (shippingData.province_id > 0) {
      fetchCityListData(shippingData.province_id)
      .then((data) => {
        setCities(data);
      })
      .catch(err => console.log(err))
    }
  },[shippingData.province_id])

  useEffect(() => {
    setShippingData({
      ...shippingData,
      zip_code: Number(shippingData.codigo_postal)
    })
  }, [shippingData.ciudad_id])

  useEffect(() => {
    fetchProvinceListData()
      .then((data) => {
        setProvinces(data);
      })
      .catch(err => console.log(err))
  }, []);

  return (
    <>
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
                city_id: Number(e.target.value),
                zip_code: e.target.value >0 ? Number(cities[e.target.value-1].codigo_postal) : ''
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
      <Row>
        <Form as={Col} className="mt-3">
          <Form.Group as={Col} xs={6} controlId="formZipCode">
            <FloatingLabel controlId="floatingCode" label="Código">
              <Form.Control
                type="text"
                placeholder="Código"
                value={shippingData.zip_code || ''}
                /* onChange={(e) => {
                  setShippingData({
                    ...shippingData,
                    observations: e.target.value,
                  });
                }} */
               disabled
              />
            </FloatingLabel>
          </Form.Group>
        </Form>
      </Row>
    </>
  )
}