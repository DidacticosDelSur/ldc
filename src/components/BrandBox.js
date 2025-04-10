import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GlobalFunctionsContext } from "../services/GlobalFunctionsContext";

export default function BrandBox({item}) {
  const { convertStringToLink } = useContext(GlobalFunctionsContext);
  const [brandName, setBrandName] = useState('');

  useEffect(()=>{
    setBrandName(convertStringToLink(item.nombre))
  },[item]);

  return (
    <Card className="mb-3 m-auto">
      <Card.Img variant="top" src={item.bannerUrl} />
      <Card.Body>
        <Card.Title>{item.nombre}</Card.Title>
        <Link to={`/marca/${item.id}-${brandName}`}>Ver Productos</Link>
      </Card.Body>
    </Card>
  )
}