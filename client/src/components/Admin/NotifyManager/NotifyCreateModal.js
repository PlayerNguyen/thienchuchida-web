import React from "react";
import { Modal } from "react-bootstrap";

export default function NotifyCreateModal({ visible, onClose }) {
  return (
    <Modal show={visible}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo thông báo mới</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}
