import { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

class BrandBox extends Component {
  render() {
    return (
      <Card className="mb-3 m-auto">
        <Card.Img variant="top" src={this.props.item.bannerUrl} />
        <Card.Body>
          <Card.Title>{this.props.item.nombre}</Card.Title>
          <Link to={`/marca/${this.props.item.id}`}>Ver Productos</Link>
        </Card.Body>
      </Card>
    )
  }
}

export default BrandBox;