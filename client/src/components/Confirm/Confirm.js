import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function Confirm({
  visible,
  title,
  context,
  onAccept,
  onDeny,
  onClose,
  acceptVariant,
  denyVariant,
}) {
  return (
    <Modal show={visible} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{context}</Modal.Body>
      <Modal.Footer>
        <Button variant={denyVariant || "danger"} onClick={onDeny}>
          Huỷ
        </Button>
        <Button variant={acceptVariant || "success"} onClick={onAccept}>
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
