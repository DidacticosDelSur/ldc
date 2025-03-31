import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../services/AuthContext";
import { fetchUserData } from "../services/UserServices";
import { Alert, Form } from "react-bootstrap";
import { fetchCartData } from "../services/CartServices";

export default function UserProfile() {
  const { user, setUser, updateCart } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [visibleError, setVisibleError] = useState(false);
  const [message, setMessage] = useState('');
  const [variantMessage, setVariantMessage] = useState('danger');

  useEffect(() => {
    if (user.isSeller) {
      fetchUserData(user.id, 'v')
        .then((data) => {
          setClientes(data.clientes);
        })
        .catch(err => console.log(err))
    }
  },[]);

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
    const params = {
      user: user.id,
      clientId: user.clientSelected
    }
    fetchCartData(params)
    .then((data)=>{
      updateCart(data);
    })
    .catch(err => console.log(err));
  }, [user])

  const selectUser = (value) => {
    let cliente = '';
    if (value == 0) {
      setMessage('Si no elige cliente no podra generar un carrito.');
      setVisibleError(true);
      setVariantMessage('warning');
    } else {
      setVisibleError(false);
      const index = clientes.findIndex(item => item.id == value)
      cliente = clientes[index].apellido + ', ' + clientes[index].nombre;
    }
    setUser((prevUser) => ({
      ...prevUser,
      clientName: cliente,
      clientSelected: value
    }))
  }

  return (
    <>
      <Alert variant={variantMessage} dismissible show={visibleError} onClose={() => setVisibleError(false)}>
        {message}
      </Alert>
      <div className="content">
        Hola {user.name}
        {user.isSeller && <Form.Select onChange={(e)=> selectUser(e.target.value)} value={user.clientSelected}>
          <option value='0'>Elige un cliente...</option>
          {clientes.map((item) => {
            return <option key={`cliente_${item.id}`} value={item.id}>{item.nombre} {item.apellido}</option>
          })}
        </Form.Select>}
      </div>
    </>
  )
}