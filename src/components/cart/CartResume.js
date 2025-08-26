import React, { useContext } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { AuthContext } from '../../services/AuthContext';
import { GlobalFunctionsContext } from '../../services/GlobalFunctionsContext';
import './CartResume.scss';
import { ArrowLeft, Cart } from 'react-bootstrap-icons';

export default function CartResume({shippingMode, handleFinish, handleKeepShopping}) {
  const { formatCurrency } = useContext(GlobalFunctionsContext);
  const { subtotal, iva, total, descuento } = useContext(AuthContext);

  return (
    <div className='resume-content'>
      <div className='resumen'>
        <div className='title'>
          <Cart />
          Resumen de compra</div>
        <Card className='container-shop'>
          <ListGroup>
            <ListGroupItem>
              Subtotal: <span>$ {formatCurrency(subtotal)}</span>
            </ListGroupItem>
            <ListGroupItem>
              Descuento: <span>$ {formatCurrency(descuento)}</span>
            </ListGroupItem>
            <ListGroupItem>
              Iva: <span>$ {formatCurrency(iva)}</span>
            </ListGroupItem>
          </ListGroup>
        </Card>
        <div className='container-shop total'>
          <div className='title'>Total Estimativo <span className='total-precio'>${formatCurrency(total)}</span></div>
          <div className='minumum-msg'>Se necesita una compra mínima total de $300.000,00 (+IVA) para validar su pedido.<br />
            * Los precios y el stock pueden variar sin previo aviso y están sujetos a cambios inflacionarios.</div>
        </div>
        {!shippingMode && 
          <div className='btn-content'>
            <Button variant="third" onClick={handleFinish}>Confirmar Compra</Button>
          </div>
        }
      </div>
      {!shippingMode && 
        <div className='btn-content'>
          <Button variant="secondary" onClick={handleKeepShopping}>
            <ArrowLeft />
            Seguir comprando
          </Button>
        </div>
      }
    </div>
  )
}