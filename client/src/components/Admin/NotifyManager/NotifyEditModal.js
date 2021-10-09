import React, { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import Editor from "../Editor/Editor";
import toastHelper from "../../../helpers/toastHelper";
import NotifyService from "../../../services/NotifyService";
import DOMPurify from "dompurify";

export default function NotifyEditModal({ notify, visible, onClose, onUpdate }) {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    handleUpdateData();
  };

  useEffect(() => {
    if (notify) {
      setTitle(notify.title)
      setData(notify.context);
    }
  }, [notify])

  const handleUpdateData = () => {
    if (!notify) {
      throw Error("Not found notify");
    }
    // Validate input
    if (title === "" || data === "") {
      toastHelper.error("Dữ liệu còn trống");
      return;
    }
    // Sanitize the HTML format
    setData(DOMPurify.sanitize(data));
    setUpdating(true);
    // Update a current notify
    NotifyService.updateNotify(notify._id, title, data)
      .then((response) => {
        const { data, message } = response.data;
        toastHelper.success(message);
        onUpdate(data);
      })
      .finally(() => {
        setUpdating(false);
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
        <Modal.Title>Chỉnh sửa thông báo</Modal.Title>
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
          onClick={handleUpdateData}
          variant="primary"
          disabled={updating}
        >
          {updating ? `Đang sửa...` : `Sửa`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
