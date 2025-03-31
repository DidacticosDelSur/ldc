import { useContext, useEffect } from "react";
import { Check } from "react-bootstrap-icons";
import { AuthContext } from "../../services/AuthContext";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";

import "./OrderConfirmed.scss";

export default function OrderConfirmed(orderId) {
  const { user, order, isEmpty } = useContext(AuthContext);
  const { formatNumber, formatCurrency } = useContext(GlobalFunctionsContext);

  useEffect(() => {
    const orderPrev = localStorage.getItem('order') ? JSON.parse(localStorage.getItem('order'))  : {} ;
    if (isEmpty(orderPrev)) {
      window.location.href = '#/';
    }
  },[])

  return (
    <>
    {order && 
    <div className="content-wrap">
      <div className="head-confirmation">
        <div className="conf"><Check /> <span>Confirmación del pedido</span></div>
        <p>¡Felicitaciones {user.name}{user.clientName ? user.clientName != '' ? ` (${user.clientName})` : '' : ''}! Su pedido se ha completado con éxito.</p>
        <p className="small">Su Número de Pedido es #{formatNumber(order.id)}</p>
        <p className="green">Se ha enviado un correo de confirmación. Revise su correo no deseado. ¡Muchas gracias!</p>
        <p className="red">Atención: no debe abonar nada hasta que el pedido sea confirmado por un representante.</p>
      </div>
      <div className="wide-content">
        <div className="confirmation-block">
          <div className="flexBlock detail-buy">
            <div className="blocks">
              <h3>Mis datos</h3>
              <div className="intern">
                <div className="intern-content">
                  <div className="title">Datos del pedido</div>
                  <div className="flex">
                    <p><b>Mi número de pedido:</b> #{formatNumber(order.id)}</p>
                    <p><b>Fecha del pedido:</b> {order.fecha}</p>
                  </div>
                  {order.observaciones != 'undefined' && 
                  <p><b>Observaciones:</b> {order.observaciones}</p>
                  }
                </div>

                <div className="block">
                  <div className="title">Datos personales</div>
                  <p>{order.cliente}</p>
                  <p>{order.email}</p>
                  <p>Dirección: {order.direccion_envio}</p>
                  <p>{order.ciudad}</p>
                </div>
              </div>
            </div>
            <div className="blocks sec">
              <h3>Resumen del pedido</h3>
              <div className="intern">
                <div className="title">Resumen de compra</div>
                <p>Subtotal: <span>{formatCurrency(order.subtotal)}</span></p>
                <p>Descuento: <span>{formatCurrency(order.descuento)}</span></p>
                <p>Iva: <span>{formatCurrency(order.iva)}</span></p>
                <div className="flexBlock">
                  <p className="tot">Total estimativo*</p>
                  <p>{formatCurrency(order.total)}</p>
                </div>
                <div className="note">* Los precios y el stock pueden variar sin previo aviso y están sujetos a cambios inflacionarios.</div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* */}
    </div>
  }
  </>
  )
}