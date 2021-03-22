import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ShowCard.css";
const ShowCard = (props) => {
  const { image, name, id } = props.cardDetail;
  return (
    <div className="col-md-3 text-center">
      <div className="mainCard">
        <Link className="showcardlink" to={`destination/${name}`}>
          <Card key={id}>
            <Card.Img variant="top" src={image} className="img-fluid" />
            <Card.Body>
              <Card.Title className="productName">{name}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default ShowCard;
