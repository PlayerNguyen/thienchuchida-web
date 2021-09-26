import React from "react";
import BookService from "../../../services/BookService";
import toastHelper from "../../../helpers/toastHelper";
import { Modal, Button } from "react-bootstrap";
export default function BookRemoveConfirmModel({
  id,
  onRemove,
  visible,
  close,
}) {
  /** Remove a book */
  const handleRemoveBook = (id) => {
    BookService.deleteBook(id)
      .then((response) => {
        const { message } = response.data;
        // Response a message
        toastHelper.success(message);
        // Render callback
        onRemove(id);
      })
      .finally(() => {
        // Dismiss this modal
        close();
      });
  };

  return (
    <Modal show={visible}>
      <Modal.Header closeButton>
        <Modal.Title>Xoá truyện</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Bạn có chắc chắn muốn xoá truyện này. Toàn bộ nội dung về tập truyện sẽ
        bị xoá.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={close}>
          Huỷ
        </Button>
        <Button variant="danger" onClick={() => handleRemoveBook(id)}>
          Xác nhận
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
