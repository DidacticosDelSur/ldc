import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { fetchSellerData, fetchUserData } from "../../services/UserServices";
import { Alert, Col, Form, ListGroup, Row } from "react-bootstrap";
import { fetchCartData } from "../../services/CartServices";

import "./UserProfile.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BellIcon, BoxesIcon, LockIcon, User } from "lucide-react";
import Viajante from "../../assets/images/viajante.png"

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  const isProfile = current === '/perfil-usuario'
  const isAdvertisement = current === '/perfil-usuario/anuncios'
  const isOrders =  current === '/perfil-usuario/pedidos' || current.startsWith('/perfil-usuario/detalle_pedido/')
  const isPass =  current === '/perfil-usuario/cambiar-password'
  const isShipping = current === '/perfil-usuario/envios'

  const [activeOrders, setActiveOrders] = useState(false);

  const { user, setUser, updateCart } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [seller, setSeller] = useState({});
  const [visibleError, setVisibleError] = useState(false);
  const [message, setMessage] = useState('');
  const [variantMessage, setVariantMessage] = useState('danger');
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')

  useEffect(() => {
    if (user.isSeller) {
      fetchUserData(user.id, 'v')
        .then((data) => {
          setClientes(data.clientes);
        })
        .catch(err => console.log(err))
    } else {
      fetchSellerData(user.id)
      .then((data) => {
        setSeller(data);
      })
      .catch(err => console.log(err))
    }

  },[user]);

  useEffect(() => {
    sessionStorage.setItem('user', JSON.stringify(user));
    let params = {
      user: user.id,
    }
    if (user.clientSelected) {
      params = {
        ...params,
        clientId: user.clientSelected
      }
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

  const handleChangePage = (page = null) => {
    let url = '/perfil-usuario';
    if (page == 'orders') {
      url += '/pedidos'
    }
    if (page == 'shipping') {
      url += '/envios'
    }
    if (page == 'advertisement') {
      url += '/anuncios'
    }
    if (page == 'password') {
      url += '/cambiar-password'
    }
    navigate(url);
  }

  useEffect(()=>{
    switch (current) {
      case '/perfil-usuario' : setTitle('Mis Datos');
                              setSubtitle('');
                              break;
      case '/perfil-usuario/pedidos': setTitle('Pedidos')
                                    setSubtitle('')
                                    break
     case '/perfil-usuario/anuncios': setTitle('Anuncios')
                                      setSubtitle('Conocé todas las novedades en marcas, productos y precios.')
                                      break
    }
    if (current.includes('/perfil-usuario/detalle_pedido')) {
      setTitle('Detalle Pedido')
      setSubtitle('')
    }
  },[current])

  return (
    <>
      <Alert variant={variantMessage} dismissible show={visibleError} onClose={() => setVisibleError(false)}>
        {message}
      </Alert>
      <div className="fondoPerfil">
        <div className="fondoVioleta header">
          <div className="title">{title}</div>
          <div className="subtitle">{subtitle}</div>
        </div>
        <div className="contentPerfil">
          <Row>
            <Col className="aside-content">
              <aside>
                <div className="lateral-menu">
                  <div className="user-data">
                    <div className="small-text">Hola! 👋 </div>
                    <h2>{user.name}!</h2>
                  </div>
                  <ListGroup>
                    <ListGroup.Item className={`${isProfile ? 'active' : '' }`} onClick={()=>{handleChangePage()}}>
                      <User />
                      <div className="label">Mis Datos</div>
                    </ListGroup.Item>
                    <ListGroup.Item className={`${isAdvertisement ? 'active' : '' }`} onClick={()=>{handleChangePage('advertisement')}}>
                      <BellIcon />
                      <div className="label">Anuncios</div>
                    </ListGroup.Item>
                    {/* <ListGroup.Item className={`${isShipping ? 'active' : '' }`} onClick={()=>{handleChangePage('orders')}}>
                      <MapPin />
                      Envíos</ListGroup.Item>*/}
                    <ListGroup.Item className={`${isOrders ? 'active' : '' }`} onClick={()=>{handleChangePage('orders')}}>
                      <BoxesIcon />
                      <div className="label">Pedidos</div>
                    </ListGroup.Item>
                    <ListGroup.Item className={`${isPass ? 'active' : '' }`} onClick={()=>{handleChangePage('password')}}>
                      <LockIcon />
                      <div className="label">Contraseña</div>
                    </ListGroup.Item> 
                  </ListGroup>
                  
                </div>
                <div className="seller-data mt-5">
                {user.isSeller 
                  ? <div className="client-card">
                      Opera en nombre de:
                      <Form.Select onChange={(e)=> selectUser(e.target.value)} value={user.clientSelected}>
                        <option value='0'>Elige un cliente...</option>
                        {clientes.map((item) => {
                          return <option key={`cliente_${item.id}`} value={item.id}>{item.nombre} {item.apellido}</option>
                        })}
                      </Form.Select>
                    </div>
                  : <>
                      <div className="avatar">
                        <img src={Viajante} alt="Viajante" />
                      </div>
                      <div className="data-card">
                        Tu Viajante es:<br />
                        {seller && 
                        <>
                          <div className="big-data">{seller.seller_name}<br /> <span className="small-data">{seller.email}</span></div> 
                        </>
                        }
                      </div>
                    </>
                }
              </div>
            </aside>
            </Col>
            <Col className="mt-3 data-content">
              <Outlet />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
