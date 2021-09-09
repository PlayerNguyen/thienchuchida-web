import React, { useState } from "react";
import { Modal, Button, ProgressBar } from "react-bootstrap";
import ResourceService from "../../../services/ResourceService";
import {useHistory } from "react-router-dom"

export default function RemoveModal(props) {
  const [isLoading, setLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const history = useHistory();

  const handleOnClose = () => {
    props.onClose();
  };

  const handleRemoveElementData = (id) => {
    const arr = props.data.filter((e) => e != id)
    console.log(arr)
    props.setData(arr)
  }

  const handleOnDelete = async () => {
    setLoading(true);
    setProgressValue(100);
    
    for (let i in props.selection) {
      const id = props.selection[i];
      // const response = 
        await ResourceService.removeResource(id);
      // const { data } = response.data; 
    }
    // Reload the page to update
    window.location.reload()
  };

  return (
    <Modal
      // {...props}
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      // centered
      onHide={handleOnClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Xoá tài nguyên
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Remove modal */}
        <div>
          <b>
            Bạn có chắc chắn xoá các tệp vừa chọn, bạn sẽ không thể hoàn tác
            hành động sẽ làm.
          </b>
        </div>
        {isLoading && <ProgressBar animated now={progressValue} />}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOnClose} variant="primary">
          Huỷ
        </Button>
        <Button onClick={handleOnDelete} variant="danger" disabled={isLoading}>
          Xoá
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
