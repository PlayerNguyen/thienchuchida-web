import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ResourceSelectModal.scss";
import ResourceItem from "./ResourceItem";
import ResourceService from "../../../services/ResourceService";

export default function ResourceSelectModal({ visible, close, onChoose }) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);
  

  useEffect(() => {
    ResourceService.getAllResources().then((response) => {
      const { data } = response.data;
      setData(data);
    });
  }, []);

  return (
    <Modal
      show={visible}
      fullscreen={true}
      onHide={close}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Chọn tài nguyên
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-wrap container">
          {data &&
            data.map((e, i) => {
              return <ResourceItem key={i} id={e} disableInfo />;
            })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button>Chọn</Button>
      </Modal.Footer>
    </Modal>
  );
}
