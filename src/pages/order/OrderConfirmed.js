import { useContext, useEffect } from "react";
import { Cart, Check, Check2Square, EnvelopeCheck, ExclamationOctagonFill } from "react-bootstrap-icons";
import { AuthContext } from "../../services/AuthContext";
import { GlobalFunctionsContext } from "../../services/GlobalFunctionsContext";

import "./OrderConfirmed.scss";
import { User } from "lucide-react";

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
    <div className="order-confirmed">
      <div className="purple-header confirmed">
        <div className="congrats"></div>
        <div className='content'>
          <div className='title'>
            <Check2Square />
            Felicitaciones!</div>
          <div className='subtitle'>Su pedido se ha completado con éxito.<br /> <span>Su Número de Pedido es #{formatNumber(order.id)}</span> </div>
        </div>
        <div className="congrats-right"></div>
      </div>
      <div className="cart-container">
          <div className="head-confirmation">
            <div className="message success">
              <EnvelopeCheck />
              Se ha enviado un correo de confirmación. Revise su correo no deseado.<br /> ¡Muchas gracias!
            </div>
            <div className="message warning">
              <ExclamationOctagonFill />
              Atención: no debe abonar nada hasta que el pedido sea confirmado por <br /> un representante.
            </div>
            <div className="data-content">
              <div className="blocks">
                <div className="title">
                  <User />
                  Mis datos
                </div>
                <div className="intern">
                  <div className="intern-content">
                    <div className="title">Datos del pedido</div>
                    <div className="data">
                      <div className="data-item">Mi número de pedido: <b>#{formatNumber(order.id)}</b></div>
                      <div className="data-item">Fecha del pedido: <b>{order.fecha}</b></div>
                      {order.observaciones != 'undefined' &&
                        <div className="data-item">Observaciones: <b>{order.observaciones}</b></div>
                      }
                    </div>
                  </div>

                  <div className="intern-content">
                    <div className="title">Datos personales</div>
                    <div className="data">
                      <div className="data-item">{order.cliente}</div>
                      <div className="data-item">{order.email}</div>
                      <div className="data-item">Dirección: {order.direccion_envio}</div>
                      <div className="data-item">{order.ciudad}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="blocks">
                <div className="title">
                  <Cart />
                  Resumen de compra
                </div>
                <div className="intern">
                  <div className="intern-content">
                    <div className="data">
                      <div className="data-item">Subtotal: <b>${formatCurrency(order.subtotal)}</b></div>
                      <div className="data-item">Descuento: <b>${formatCurrency(order.descuento)}</b></div>
                      <div className="data-item">IVA: <b>${formatCurrency(order.iva)}</b></div>
                    </div>
                  </div>

                  <div className="intern-content blue">
                    <div className="title">Total Estimativo <span>${formatCurrency(order.total)}</span></div>
                    <div className="data">
                      <div className="note">* Los precios y el stock pueden variar sin previo aviso y están sujetos a cambios inflacionarios.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*<div className="wide-content">
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
                      <div className="title">Total Estimativo </div>

                    </div>
                  </div>
                </div>
                <div className="blocks sec">
                  <h3>Resumen del pedido</h3>
                  <div className="intern">
                    <div className="title">Resumen de compra</div>
                    <p>Subtotal: <span></span></p>
                    <p>Descuento: <span></span></p>
                    <p>Iva: <span></span></p>
                    <div className="flexBlock">
                      <p className="tot">Total estimativo*</p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>  */}
      </div>
    </div>
  }
  </>
  )
}