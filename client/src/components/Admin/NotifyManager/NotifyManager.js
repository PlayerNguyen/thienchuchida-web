import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import NotifyCard from "../../NotifyCard/NotifyCard";
import NotifyCreateModal from "./NotifyCreateModal";

export default function NotifyManager() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="fw-bold">Bảng tin</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-secondary fs-4">Cài đặt chung</h1>
        </Col>
      </Row>
      <Row className="mb-2">
        <Col className="d-flex flex-wrap gap-2">
          <Button>Thêm</Button>

          <Button>Thêm thông báo</Button>
        </Col>
      </Row>
      <Row>
        <Container>
          <NotifyCard
            notifyTitle={`Notify #1`}
            notifyContext={`Notify is something make you to know`}
          />

          <NotifyCard
            notifyTitle={`Notify #1`}
            notifyContext={`Notify is something make you to know`}
          />
        </Container>
      </Row>
      <NotifyCreateModal visible={true} />
    </Container>
  );
}
