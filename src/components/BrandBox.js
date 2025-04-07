import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BrandBox({item}) {
  return (
    <Card className="mb-3 m-auto">
      <Card.Img variant="top" src={item.bannerUrl} />
      <Card.Body>
        <Card.Title>{item.nombre}</Card.Title>
        <Link to={`/marca/${item.id}`}>Ver Productos</Link>
      </Card.Body>
    </Card>
  )
}