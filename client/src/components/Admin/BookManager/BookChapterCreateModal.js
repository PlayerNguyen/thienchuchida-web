import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import BookService from "../../../services/BookService";
import toastHelper from "../../../helpers/toastHelper";

export default function BookChapterCreateModal({ visible, onHide, bookId }) {
  const [name, setName] = useState("");
  const [validate, setValidate] = useState(false);
  const history = useHistory();

  const handleOnChange = ({ target }) => {
    setName(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create new chapter
    handleCreate();
  };

  const handleCreate = () => {
    BookService.createNewChapter(bookId, name).then((response) => {
      // Extract response data
      const { data, message } = response.data;
      // Send a message
      toastHelper.success(message);
      // Navigate to edit page
      history.push(`/admin/quan-ly-truyen/${bookId}/${data._id}`);
      // Close modal
      onHide();
    });
  };

  useEffect(() => {
    setValidate(name !== "");
  }, [name]);

  return (
    <Modal show={visible} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo tập mới</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Body here */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tên tập truyện</Form.Label>
            <Form.Control type="text" value={name} onChange={handleOnChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Huỷ
        </Button>
        <Button variant="success" disabled={!validate} onClick={handleCreate}>
          Tạo
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
