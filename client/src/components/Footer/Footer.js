import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer__wrapper">
      {/* <footer className="footer">
        
      </footer> */}
      <Container className="footer">
        <Row>
          <Col>
            <h1 className="text-light">Theo dõi</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
