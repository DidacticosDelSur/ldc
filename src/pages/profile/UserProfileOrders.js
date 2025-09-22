import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { getOrders } from "../../services/OrderServices";
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
  
  useEffect(()=>{
    let params = {
      page: currentPage,
      itemsPerPage: itemsPerPage,
      user: user.id,
      isSeller: user.isSeller
    }
    getOrders(params)
      .then((data) => {
        console.log(data);
        setOrders(data.pedidos);
        setTotalPages(data.totalPages);
      })
      .catch(err => console.log(err))
  },[user, currentPage]);

  const gotToOrder = (id) => {
    console.log(id);
  }

  return (
    <>
      {orders.length > 0 
        ?
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
              {orders.map((ord)=>{
                return (
                  <tr>
                    <td>{ord.date}</td>
                    {user.isSeller && <td>{ord.client}</td>}
                    <td>{formatNumber(ord.id)}</td>
                    <td className="multiple-data">{ord.state} {ord.vendedor_id && <div className="dot"></div>}</td>
                    <td>{formatCurrency(ord.total)}</td>
                    <td>
                      <Link to={`/perfil-usuario/detalle_pedido/${ord.id}`}>Ver Pedido</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
          <CustomPagination currentPage={currentPage} goToPage={paginate} totalPages={totalPages} />
        </div>
        :<div>Todavia no realizo ningun pedido</div>
      }
    </>
    

  )
}