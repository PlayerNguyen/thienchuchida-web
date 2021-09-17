import React from "react";
import { Modal } from "react-bootstrap";
import Config from "../../../config/server.config";
export default function ResourcePreviewModal({ data, visible, close }) {

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={visible}
        onHide={close}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {data && data.originalName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="preview__wrapper">
            <img
              src={
                data
                  ? `${Config.SERVER_API_URL}/resources/resource/${data._id}/raw`
                  : Config.DEFAULT_THUMBNAIL
              }
              alt="preview"
              className="preview__image"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
