import React from "react";
import { Button, Modal } from "react-bootstrap";

function ConfirmModal({ visible, onConfirm, onClose, title, content, loading }) {
  return (
    <>
      <Modal show={visible} onHide={onClose}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" disabled={loading} onClick={onConfirm}>
            {loading ? "Loading..." : "Xác nhận"}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
