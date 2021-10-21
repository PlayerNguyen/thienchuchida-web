import React, { useEffect, useRef, useState } from "react";
import { Modal, Form, Button, ProgressBar, Alert } from "react-bootstrap";

import ResourceService from "../../../services/ResourceService";
import "./ResourceManager.scss";

export default function UploadModal(props) {
  const [isValid, setValid] = useState(false);
  const [files, setFiles] = useState(null);
  const [isPrivate, setPrivate] = useState(false);
  const [isUploading, setIsUploading] = useState();
  const [isError, setIsError] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const fileInput = useRef(null);

  /**
   * Selected or added files into input
   */
  const handleChangeFiles = (event) => {
    setFiles(event.target.files);
  };

  useEffect(() => {
    if (files) {
      // Check files type whether valid or not
      for (let i = 0; i < files.length; i++) {
        if (!files[i].type.includes("image")) {
          setIsError(true);
          setResponseMessage("Tệp bạn đã chọn phải là tệp ảnh!");
          setValid(false);
          return;
        }
      }
      setValid(files.length > 0);
    }
  }, [files]);

  /**
   * Clean up
   */
  useEffect(() => {
    return resetModal();
  }, []);

  const handleUpload = () => {
    setValid(false);
    setIsUploading(true);
    const formData = new FormData();
    const fileArray = [...files];
    fileArray.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("private", isPrivate)

    ResourceService.uploadResources(formData)
      .then((response) => {
        const { data } = response.data;
        // Report to user
        setResponseMessage(response.data.message);
        // Remove files
        setFiles(null);

        // Set files to lobby
        Promise.all(data).then((values) => {
          props.setData([...values, ...props.data]);
        })
        
        // Then close
        handleOnClose();
      })
      .catch((error) => {
        const message = error.response && error.response.data.error.message;
        // Set response message
        setResponseMessage(message);
        // Set is error
        setIsError(true);
      })
      .finally(() => {
        // Reset a form, not to duplicate upload files
        fileInput.current.value = null;
        // Disable is loading
        setIsUploading(false);
      });
  };

  const resetModal = () => {
    setResponseMessage(null);
    setValid(false);
    setIsError(false);
    setIsUploading(false);
    setFiles(null);
  };

  const handleOnClose = () => {
    resetModal();
    props.onClose();
  };

  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={handleOnClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thêm tệp mới
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* File upload form */}
        <Form ref={fileInput}>
          <Form.Group controlId="formFileMultiple">
            <Form.Label>
              <>Chọn tệp hoặc kéo/thả để tải lên</>
            </Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleChangeFiles}
              accept="image/*"
            />
          </Form.Group>

          <Form.Group className="mt-5">
            <Form.Check
              type="checkbox"
              label="Tệp riêng tư (chỉ hiển thị khi người dùng đã đăng nhập)"
              name="private"
              checked={isPrivate}
              onChange={() => {
                setPrivate(!isPrivate)
              }}
              disabled={!files}
            />
          </Form.Group>
        </Form>
        {/* A progress bar when uploading */}
        {isUploading && <ProgressBar animated now={100} className="mt-2" />}
        {responseMessage && (
          <Alert className="mt-2" variant={isError ? `danger` : `success`}>
            {responseMessage}
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOnClose} variant="danger">
          Đóng
        </Button>
        <Button onClick={handleUpload} disabled={!isValid}>
          Tải lên
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
