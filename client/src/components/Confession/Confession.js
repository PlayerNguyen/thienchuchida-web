import React, { useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ConfessionService from "../../services/ConfessionService";
import toastHelper from "../../helpers/toastHelper";
import { Helmet } from "react-helmet-async";

export default function Confession() {
  const [content, setContent] = useState("");
  const [secret, setSecret] = useState(false);
  const [posting, setPosting] = useState(false);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosting(true);
    ConfessionService.createConfession(content, secret)
      .then((response) => {
        const { message } = response.data;
        toastHelper.success(message);
        setContent("");
      })
      .finally((_) => setPosting(false));
  };

  return (
    <div className="confession__wrapper text-light">
      <Helmet>
        <title>Confession</title>
      </Helmet>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} md={4} className="fw-bold">
                Bạn có gì muốn nói cùng nhà? <font color="red">*</font>
              </Form.Label>
              <Col sm={10} md={8}>
                <Form.Control
                  as="textarea"
                  className="mb-3"
                  required
                  onChange={handleContentChange}
                  value={content}
                />
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
                  onClick={(_) => setSecret(false)}
                  checked
                />
                <Form.Check
                  type="radio"
                  label="Giữ riêng cho nhà biết thôi"
                  className="mb-3"
                  name="secret"
                  title="private"
                  onClick={(_) => setSecret(true)}
                />
                <Button
                  type="submit"
                  variant="outline-primary"
                  disabled={posting}
                >
                  {posting ? `Đang gửi... ` : `Chia sẻ với nhà`}
                </Button>
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
