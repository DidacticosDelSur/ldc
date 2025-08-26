import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../services/AuthContext";
import { getOrders } from "../../services/OrderServices";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";

export default function UserProfileOrders() {
  const { user } = useContext(AuthContext);
  const { formatCurrency, formatNumber } = useContext(GlobalFunctionsContext)
  const [orders, setOrders] = useState([]);
  
  useEffect(()=>{
    let params = {
      user: user.id,
      isSeller: user.isSeller
    }
    getOrders(params)
      .then((data) => {
        console.log(data);
        setOrders(data.pedidos);
      })
      .catch(err => console.log(err))
  },[user]);

  const gotToOrder = (id) => {
    console.log(id);
  }

  return (
    <>
      {orders.length > 0 && 
        <div className="order-conent">
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
        </div>
      }
    </>
    

  )
}