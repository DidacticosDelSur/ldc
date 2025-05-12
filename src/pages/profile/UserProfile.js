import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { fetchSellerData, fetchUserData } from "../../services/UserServices";
import { Alert, Col, Form, ListGroup, Nav, Row, Tab } from "react-bootstrap";
import { fetchCartData } from "../../services/CartServices";

import "./UserProfile.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import IconSvg from "../../components/IconSvg";
import { Locate, LucideListOrdered, MapPin, User } from "lucide-react";
import { Boxes, People, Person } from "react-bootstrap-icons";
import Viajante from "../../assets/images/viajante.png"

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const current = location.pathname;

  const isProfile = current === '/perfil-usuario'
  const isOrders =  current === '/perfil-usuario/pedidos' || current.startsWith('/perfil-usuario/detalle_pedido/')
  const isShipping = current === '/perfil-usuario/envios'

  const [activeOrders, setActiveOrders] = useState(false);

  const { user, setUser, updateCart } = useContext(AuthContext);
  const [clientes, setClientes] = useState([]);
  const [seller, setSeller] = useState({});
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

  const handleChangePage = (page = null) => {
    let url = '/perfil-usuario';
    if (page == 'orders') {
      url += '/pedidos'
    }
    if (page == 'shipping') {
      url += '/envios'
    }
    navigate(url);
  }

  return (
    <>
      <Alert variant={variantMessage} dismissible show={visibleError} onClose={() => setVisibleError(false)}>
        {message}
      </Alert>
      <div className="purple-header"></div>
      <div className="profile"></div>
      <div className="content mt-5">
        <Row className="mb-5">
          <Col sm={4} className="profile-menu">
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
                {/* <ListGroup.Item className={`${isShipping ? 'active' : '' }`} onClick={()=>{handleChangePage('orders')}}>
                  <MapPin />
                  Envíos</ListGroup.Item>*/}
                <ListGroup.Item className={`${isOrders ? 'active' : '' }`} onClick={()=>{handleChangePage('orders')}}>
                  <Boxes />
                  <div className="label">Pedidos</div>
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
          <Col sm={8} className="content-profile">
            <Outlet />
          </Col>
        </Row>
        
        {/* <Tab.Container defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="profile">Perfil</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orders">Pedidos</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="Profile">Datos del usuario</Tab.Pane>
                <Tab.Pane eventKey="orders">Pedidos del usario</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        {user.isSeller && <Form.Select onChange={(e)=> selectUser(e.target.value)} value={user.clientSelected}>
          <option value='0'>Elige un cliente...</option>
          {clientes.map((item) => {
            return <option key={`cliente_${item.id}`} value={item.id}>{item.nombre} {item.apellido}</option>
          })}
        </Form.Select>} */}
      </div>
    </>
  )
}
