import React, { useEffect, useRef, useState } from "react";
import { Card, Modal, Form, Button, ProgressBar, Alert } from "react-bootstrap";
import Config from "../../../config/server.config";
import ResourceService from "../../../services/ResourceService";
import "./ResourceManager.scss";

function ResourceItem({ resourceItem, selected, onClick }) {
  return (
    <Card
      className={`resourceitem ${selected ? `resourceitem--selected` : ``}`}
      onClick={onClick}
    >
      <div className="resourceitem__thumbnail">
        <Card.Img
          src={
            resourceItem
              ? `${Config.SERVER_API_URL}/${resourceItem.path}`
              : Config.DEFAULT_THUMBNAIL
          }
          alt="A thumbnail for resource"
        />
      </div>
    </Card>
  );
}

function UploadModal(props) {
  const [isValid, setValid] = useState(false);
  const [files, setFiles] = useState(null);
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
    if (files) setValid(files.length > 0);
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

    ResourceService.uploadResources(formData)
      .then((response) => {
        // Report to user
        setResponseMessage(response.data.message);
        // Remove files
        setFiles(null);
        // Set files to lobby
        response.data.data.forEach((file) => {
          props.setData([...props.data, file]);
        });
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
      {...props}
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
            <Form.Control type="file" multiple onChange={handleChangeFiles} />
          </Form.Group>
        </Form>
        {/* A progress bar when uploading */}
        {isUploading && <ProgressBar animated now={100} className="mt-2" />}
        {responseMessage && (
          <Alert className="mt-2" variant={isError ? `error` : `success`}>
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

export default function ResourceManager() {
  /**
   * Select variables
   */
  const [selection, setSelection] = useState([]);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const [data, setData] = useState([]);

  const handleToggleSelect = (index) => {
    // Found index in selection, remove it
    selection.indexOf(index) !== -1
      ? setSelection(selection.filter((e) => e !== index))
      : setSelection([...selection, index]);
  };

  const handleOpenUploadModal = () => {
    setUploadVisible(true);
  };
  const handleCloseUploadModal = () => {
    setUploadVisible(false);
  };

  /**
   * Trackers selection
   */
  useEffect(() => {
    // console.log(selection);
    ResourceService.getAllResources().then(({ data }) => {
      // console.log()
      setData(data.data);
    });
  }, [selection]);

  return (
    <div className="resource__wrapper">
      <div className="resource__header">
        <h1 className="title text-dark">Tài nguyên</h1>
        <p onClick={handleOpenUploadModal}>Thêm tệp mới </p>
      </div>
      <div className="resource__container">
        {data &&
          data.map((ele, index) => {
            return (
              <ResourceItem
                resourceItem={ele}
                selected={selection.indexOf(index) !== -1}
                key={index}
                onClick={() => {
                  handleToggleSelect(index);
                }}
              />
            );
          })}
      </div>
      <UploadModal
        show={isUploadVisible}
        onClose={handleCloseUploadModal}
        setData={setData}
        data={data}
      />
    </div>
  );
}
