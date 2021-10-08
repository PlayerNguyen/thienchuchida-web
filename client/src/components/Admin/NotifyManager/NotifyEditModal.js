import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import Editor from "../Editor/Editor";
import toastHelper from "../../../helpers/toastHelper";
import NotifyService from "../../../services/NotifyService";
import DOMPurify from "dompurify";

export default function NotifyEditModal({ visible, onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [creating, setCreating] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    handleCreateData();
  };

  const handleCreateData = () => {
    // Validate input
    if (title === "" || data === "") {
      toastHelper.error("Dữ liệu còn trống");
      return;
    }
    // Sanitize the HTML format
    setData(DOMPurify.sanitize(data));
    setCreating(true);
    // Generate new notify
    NotifyService.createNotify(title, data)
      .then((response) => {
        const { data, message } = response.data;
        toastHelper.success(message);
        onCreate(data);
      })
      .finally(() => {
        setCreating(false);
        onClose();
      });
  };

  useEffect(() => {
    return () => {
      setTitle("");
      setData("");
    };
  }, []);

  return (
    <Modal
      show={visible}
      autoFocus={false}
      enforceFocus={false}
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Tạo thông báo mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="text-secondary">Tiêu đề</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Tiêu đề của thông báo"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="text-secondary">Nội dung</Form.Label>
            <Editor
              data={data}
              onDataUpdate={(data) => {
                setData(data);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={(_) => {
            onClose();
          }}
          variant="danger"
        >
          Đóng
        </Button>
        <Button
          onClick={handleCreateData}
          variant="primary"
          disabled={creating}
        >
          {creating ? `Đang tạo...` : `Tạo`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
