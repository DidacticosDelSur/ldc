import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { fetchOrderStates, getOrders } from "../../services/OrderServices";
import { Button, Col, FormSelect, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";
import { PageContext } from "../../services/PageContext";
import CustomPagination from "../../components/Pagination";

export default function UserProfileOrders() {
  const { currentPage, totalPages, itemsPerPage, paginate, handleLimitChange, setTotalPages, pageGroup } = useContext(PageContext);
  const { user } = useContext(AuthContext);
  const { formatCurrency, formatNumber } = useContext(GlobalFunctionsContext)
  const [orders, setOrders] = useState([]);
  const [ states, setStates ] = useState([])
  const [stateId, setStateSelected ] = useState(1)
  
  useEffect(()=>{
    let params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      user: user.id,
      isSeller: user.isSeller,
      state: stateId
    }
    getOrders(params)
      .then((data) => {
        console.log(data);
        setOrders(data.pedidos);
        setTotalPages(data.totalPages);
      })
      .catch(err => console.log(err))
  },[user, currentPage, stateId]);

  useEffect(()=>{
    fetchOrderStates()
    .then((data)=>{
      setStates(data)
    })
    .catch()
  },[])

  return (
    <>
      
        <div className="order-conent">
          <Row>
            <Col xs lg="2">
              <label>Cant. por Pag.</label>
              <FormSelect id="limit" value={itemsPerPage} onChange={handleLimitChange}>
                {pageGroup.map((item)=> {
                  return <option value={item} key={`limit_${item}`}>{item}</option>
                })}
              </FormSelect>
            </Col>
            <Col xs lg="2">
              <label>Estado</label>
              <FormSelect id="limit" value={stateId} onChange={(e)=>{setStateSelected(e.target.value)}}>
                {states.map((item)=> {
                  return <option value={item.id} key={`state_${item.id}`}>{item.nombre}</option>
                })}
              </FormSelect>
            </Col>
          </Row>
          <Table>
            <thead>
              <tr>
                <th>Fecha</th>
                {user.isSeller && <th>Cliente</th>}
                <th>Pedido</th>
                <th>Estado</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 
                ?
                orders.map((ord)=>{
                  return (
                    <tr>
                      <td>{ord.date}</td>
                      {user.isSeller && <td>{ord.client}</td>}
                      <td>{formatNumber(ord.id)}</td>
                      <td className="multiple-data">{ord.state} {ord.vendedor_id && <div className="dot"></div>}</td>
                      <td>{formatCurrency(ord.total)}</td>
                      <td>
                        {stateId != 3
                          ?<Link to={`/perfil-usuario/detalle_pedido/${ord.id}`}>Ver Pedido</Link>
                          :<Link to={`/perfil-usuario/detalle_pedido_finalizado/${ord.id}`}>Ver Pedido</Link>
                        }
                      </td>
                    </tr>
                  )
                })
                :<tr><td colSpan={6}>Todavia no realizo ningun pedido</td></tr>
              }
            </tbody>
          </Table>
          <CustomPagination currentPage={currentPage} goToPage={paginate} totalPages={totalPages} />
        </div>
    </>
    

  )
}