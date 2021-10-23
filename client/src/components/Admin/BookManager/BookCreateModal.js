import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import BookService from "../../../services/BookService";
import Editor from "../Editor/Editor";

export default function BookCreateModal({ visible, onHide }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [valid, setValid] = useState(false);
  const [creating, setCreating] = useState(false);

  const handleTitleChange = ({ target }) => {
    setTitle(target.value);
  };

  const handleDescriptionChange = (data) => {
    setDescription(data);
  };

  const handlePasswordChange = ({ target }) => {
    setPassword(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!valid) {
      toast.error("Hãy nhập tên truyện.");
      return;
    }
    // Start to create
    handleCreate();
  };

  const handleCreate = () => {
    setCreating(true);
    BookService.createBook({ title, description, password })
      .then((response) => {
        const { data, message } = response.data;
        toast.success(message);
        history.push(`quan-ly-truyen/${data._id}`);
      })
      .finally(() => {
        setCreating(false);
      });
  };

  useEffect(() => {
    setValid(title !== "");
  }, [title]);

  return (
    <Modal
      show={visible}
      onHide={onHide}
      keyboard={true}
      autoFocus={false}
      enforceFocus={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Tạo truyện mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên truyện</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Giới thiệu về truyện</Form.Label>
            {/* Change to book editor */}
            {/* <Form.Control
              as="textarea"
              value={description}
              onChange={handleDescriptionChange}
            /> */}
            <Editor data={description} onDataUpdate={handleDescriptionChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Huỷ
        </Button>
        <Button
          variant="primary"
          // type="submit" not work because out of border
          onClick={handleCreate}
          disabled={!valid || creating}
        >
          {creating ? "Đang tạo..." : `Tạo`}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
