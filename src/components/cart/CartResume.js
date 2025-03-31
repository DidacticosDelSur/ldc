import React, { useContext } from 'react';
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { AuthContext } from '../../services/AuthContext';
import { GlobalFunctionsContext } from '../../services/GlobalFunctionsContext';

export default function CartResume({shippingMode, handleFinish}) {
  const { formatCurrency } = useContext(GlobalFunctionsContext);
  const { subtotal, iva, total, descuento } = useContext(AuthContext);

  return (
    <div className='resumen'>
      <div>Resumen de compra</div>
      <Card className='container-shop'>
        <ListGroup>
          <ListGroupItem>
            Subtotal: <span>{formatCurrency(subtotal)}</span>
          </ListGroupItem>
          <ListGroupItem>
            Descuento: <span>{formatCurrency(descuento)}</span>
          </ListGroupItem>
          <ListGroupItem>
            Iva: <span>{formatCurrency(iva)}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
      <Card className='container-shop'>
        <Card.Body>
          <Card.Title className='item'>Total estimativo* <span className='total-precio'>{formatCurrency(total)}</span></Card.Title>
          <Card.Text className='minumum-msg'>
          Se necesita una compra mínima total de $300.000,00 (+IVA) para validar su pedido.
          * Los precios y el stock pueden variar sin previo aviso y están sujetos a cambios inflacionarios.
          </Card.Text>
          {!shippingMode && 
            <Button variant="primary" onClick={handleFinish}>Finalizar Compra</Button>
          }
        </Card.Body>
      </Card>
    </div>
  )
}