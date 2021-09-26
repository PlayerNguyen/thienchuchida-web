import React from "react";
import { Modal } from "react-bootstrap";
import ResourceImage from "./ResourceImage";

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
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-break"
          >
            {data && data.originalName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResourceImage id={data && data._id} />
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
