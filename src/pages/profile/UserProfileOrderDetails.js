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
            order.seller != ""
              ? <>
                  <div className="message-seller">Pedido creado por el vendedor en nombre del cliente</div>
                  {order.client_discount > 0 
                    ? order.discount_visible 
                      ?<div className="message-seller">El cliente contaba con un descuento visible de {order.client_discount}% cuando se realizo el pedido</div>
                      :<div className="message-seller">El cliente contaba con un descuento NO visible de {order.client_discount}% cuando se realizo el pedido</div>
                    : null
                  }
                </>
              : null
            : order.discount_visible && order.client_discount > 0 
                ? <div className="message-seller">Contabas con un descuento de {order.client_discount}% cuando se realizaste el pedido</div>
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
                <th>Dto</th>
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
                    <td><span className="float-end">{it.amount}</span></td>
                    <td><span className="float-end">$ {formatCurrency(it.price)}</span></td>
                    <td><span className="float-end">$ {formatCurrency(it.price*(it.discount/100))}</span></td>
                    <td><span className="float-end"> {it.iva}%</span></td>
                    <td><span className="float-end">$ {formatCurrency(it.subtotal)}</span></td>
                  </tr>
                )
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6" className="text-end fw-bold">Subtotal</td>
                <td className="fw-bold"><span className="float-end">$ {formatCurrency(order.subtotal)}</span></td>
              </tr>
              <tr>
                {order.discount_visible && order.client_discount > 0
                  ? <>
                      <td colSpan="6" className="text-end fw-bold">Descuento Cliente {order.client_discount}%</td>
                      <td className="fw-bold"><span className="float-end">$ {formatCurrency(order.subtotal*(order.client_discount/100))}</span></td>
                    </>
                  : null
                }
              </tr>
              <tr>
                <td colSpan="6" className="text-end fw-bold">Iva Acumulado</td>
                <td className="fw-bold"><span className="float-end">$ {formatCurrency(order.iva_acumulado)}</span></td>
              </tr>
              <tr>
                <td colSpan="6" className="text-end fw-bold">Total</td>
                <td className="fw-bold"><span className="float-end">$ {formatCurrency(order.total)}</span></td>
              </tr>
            </tfoot>
          </Table>
        }
      </>
      }
    </>
  )
}