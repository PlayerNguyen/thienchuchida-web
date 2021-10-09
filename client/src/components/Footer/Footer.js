import React from "react";
import { Row, Container, Col, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <div className="footer__wrapper">
      {/* <footer className="footer">
        
      </footer> */}
      <Container className="footer">
        <Row className="mb-3">
          <Col sm={12} md="auto">
            <h1 className="text-light">Theo dõi</h1>
          </Col>
          <Col sm={12} md="auto">
            <Row className="mb-2">
              <Col sm={12} md="auto" className=" mb-2">
                <Button variant={`facebook`} size="md" className="w-100">
                  Facebook
                </Button>
              </Col>
              <Col sm={12} md="auto">
                <Button variant={`facebook`} size="md" className="w-100">
                  Facebook 2
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={12} md="auto">
            <h1 className="text-light">Group</h1>
          </Col>
          <Col sm={12} md="auto">
            <Row>
              <Col>
                <Button variant={`facebook`} size="md" className="w-100">
                Group facebook
              </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row className="text-light fw-light fs-5">
          <Col xs={12}>
            Các tác phẩm được thực hiện bởi Thiên Chu Chi Dạ, mọi vấn đề liên
            quan đến bản quyền xin hãy liên lạc cho chúng tôi.
          </Col>
          <Col className="justify-content-center" xs={12}>
            Email: tccd@gmail.com
          </Col>
        </Row>
      </Container>
    </div>
  );
}
