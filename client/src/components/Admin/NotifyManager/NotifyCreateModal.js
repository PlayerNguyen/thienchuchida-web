import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Editor from "../Editor/Editor";

export default function NotifyCreateModal({ visible, onClose }) {
  const [title, setTitle] = useState("");
  return (
    <Modal show={visible} autoFocus={false} enforceFocus={false}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo thông báo mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>

          <Form.Group className="mb-3">
            <Form.Label className="text-secondary">Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-secondary">Nội dung</Form.Label>
            <Editor data={``} onDataUpdate={() => {}} />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
