import React from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

export default function Confession() {
  return (
    <div className="confession__wrapper text-light">
      <div className="confession__header">
        <Header />
      </div>
      <Container className="confession__container">
        <Row className="mb-5 mt-5">
          <Col>
            <h1>Hãy cho nhà biết bạn muốn gì?</h1>
          </Col>
        </Row>
        <Row>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} md={4} className="fw-bold">
                Bạn có gì muốn nói cùng nhà? <font color="red">*</font>
              </Form.Label>
              <Col sm={10} md={8}>
                <Form.Control as="textarea" className="mb-3" required />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} md={4}>
                <strong>Nhà có thể chia sẻ với mọi người không?</strong>
              </Form.Label>
              <Col sm={10} md={8}>
                <Form.Check
                  type="radio"
                  label="Có thể"
                  className="mb-3"
                  name="secret"
                  title="public"
                  checked
                />
                <Form.Check
                  type="radio"
                  label="Giữ riêng cho nhà biết thôi"
                  className="mb-3"
                  name="secret"
                  title="private"
                />
                <Button type="submit" variant="outline-primary">Chia sẻ với nhà</Button>
              </Col>
            </Form.Group>
          </Form>
        </Row>
      </Container>
      <div className="confession__footer">
        <Footer />
      </div>
    </div>
  );
}
