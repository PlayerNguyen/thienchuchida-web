import "./NotifyCard.scss";
import React from "react";
import { Col } from "react-bootstrap";

export default function NotifyCard({ notifyTitle, notifyContext }) {
  return (
    <Col xs={12} className="text-black notify__wrapper">
      <h2>{notifyTitle}</h2>
      <p>{notifyContext}</p>
    </Col>
  );
}
