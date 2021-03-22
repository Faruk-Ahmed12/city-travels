import React from "react";
import { Card, Form } from "react-bootstrap";
import { useParams } from "react-router";
import fakeData from "../fakeData/fakeData";
import "./Destination.css";
import GoogleMap from "./GoogleMap";
const Destination = () => {
  const { name } = useParams();
  const found = fakeData.find((element) => element.name === name);

  const { image } = found;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 text-left">
          <Card>
            <Card.Body>
              <span className="fromTo">Pick From</span>
              <Form.Group>
                <Form.Control type="text" placeholder="Mirpur1" required />
              </Form.Group>
              <span className="fromTo">Pick TO</span>
              <Form.Group>
                <Form.Control type="text" placeholder="Dhanmundi" required />
              </Form.Group>
              <button className="searchBtn">
                Search
              </button>
            </Card.Body>
            <img src={image} alt="" />
          </Card>
        </div>
        <div className="col-md-8">{<GoogleMap></GoogleMap>}</div>
      </div>
    </div>
  );
};

export default Destination;
