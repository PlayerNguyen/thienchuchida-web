import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import NotifyService from "../../../services/NotifyService";
import Loading from "../../Loading/Loading";
import NotifyCard from "../../NotifyCard/NotifyCard";
import NotifyCreateModal from "./NotifyCreateModal";

export default function NotifyManager() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifies, setNotifies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    NotifyService.fetchNotify()
      .then((response) => {
        const { data } = response.data;
        setNotifies(data);
      })
      .finally((_) => setLoading(false));
  }, []);

  const handleAppendNotify = (data) => {
    setNotifies([data, ...notifies]);
  };

  const handleRemoveNotify = (id) => {
    setNotifies(notifies.filter((e) => e._id !== id));
  };

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
          <Button
            onClick={(_) => {
              setModalVisible(true);
            }}
          >
            Thêm
          </Button>

          <Button>Thêm thông báo</Button>
        </Col>
      </Row>
      <Row>
        <Container>
          {loading ? (
            <Loading color={`black`} />
          ) : (
            notifies &&
            notifies.map((notify, index) => {
              return (
                <NotifyCard
                  className="text-dark"
                  key={index}
                  notifyId={notify._id}
                  notifyTitle={notify.title}
                  notifyContext={notify.context}
                  onRemove={handleRemoveNotify}
                />
              );
            })
          )}
        </Container>
      </Row>
      <NotifyCreateModal
        visible={modalVisible}
        onClose={(_) => {
          setModalVisible(false);
        }}
        onCreate={handleAppendNotify}
      />
    </Container>
  );
}
