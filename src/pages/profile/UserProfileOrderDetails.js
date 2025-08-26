import { useContext, useEffect, useState } from "react";
import { getOrder } from "../../services/OrderServices";
import { Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";
import { ArrowLeft } from "react-bootstrap-icons";
import { AuthContext } from "../../services/AuthContext";

export default function UserProfileOrderDetais() {
  const { id } = useParams()
  const { user } = useContext(AuthContext);
  const { formatCurrency, formatNumber } = useContext(GlobalFunctionsContext)
  const [order, setOrder] = useState(null);
  
  useEffect(()=>{
    getOrder(id)
      .then((data) => {
        console.log(data);
        setOrder(data);
      })
      .catch(err => console.log(err))
  },[id]);

  return (
    <>
      {order &&
       <>
        <div>
          <p className="text-right"><Link to={'/perfil-usuario/pedidos'}>
          <ArrowLeft />
          Volver a Pedidos</Link></p>
          <div>Fecha: <b>{order.date}</b></div>
          <div>Nro Pedido: <b>{formatNumber(order.id)}</b></div>
          <div>Estado: <b>{order.state}</b></div>
          <div>Cliente: <b>{order.client}</b></div>
          <div>Dirección de Envío: <b>{order.shippingAddress}</b></div>
          <div>Observaciones: <b>{order.observaciones}</b></div>
          {user.isSeller ?
            order.seller != "" ? <div className="message-seller">Pedido creado por el vendedor en nombre del cliente</div> : null
            : null
          }
        </div>
        {order.items.length > 0 && 
          <Table className="mt-5">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Variación</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Iva</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((it)=>{
                return (
                  <tr>
                    <td>{it.name}</td>
                    <td>{it.variation}</td>
                    <td>{it.amount}</td>
                    <td>{formatCurrency(it.price)}</td>
                    <td>{formatCurrency(it.iva)}</td>
                    <td>{formatCurrency(it.subtotal)}</td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="5" className="text-end fw-bold">Total</td>
                <td className="fw-bold">{formatCurrency(order.total)}</td>
              </tr>
            </tfoot>
          </Table>
        }
      </>
      }
    </>
  )
}