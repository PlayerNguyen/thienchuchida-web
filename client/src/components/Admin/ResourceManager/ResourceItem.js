import React, { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import Config from "../../../config/server.config";
import ResourceService from "../../../services/ResourceService";
import "./ResourceItem.scss";

export default function ResourceItem({
  id,
  selected,
  onClick,
  disableInfo,
  minimizeThumbnail,
  onSelect,
}) {
  const [data, setData] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  useEffect(() => {
    ResourceService.getResourceMetadata(id)
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch(() => {});
  }, [id]);

  const close = () => {
    setPreviewVisible(false);
  };

  return (
    <>
      <Card
        className={`resourceitem ${selected ? `resourceitem--selected` : ``}`}
        onClick={onClick}
      >
        <div className="resourceitem__thumbnail">
          <Card.Img
            src={
              data
                ? `${Config.SERVER_API_URL}/resources/resource/${data._id}/raw`
                : Config.DEFAULT_THUMBNAIL
            }
            className={`${minimizeThumbnail && `thumbnail--small`}`}
            alt="A thumbnail for resource"
          />
        </div>

        {!disableInfo && (
          <Card.Body>
            <Card.Title>{data && data.originalName}</Card.Title>
            <span>Text</span>
          </Card.Body>
        )}
        <Card.Footer>
          <Button
            onClick={() => {
              setPreviewVisible(true);
            }}
            variant="link"
          >
            Xem
          </Button>
          <Button onClick={onSelect} variant="link">
            Chọn
          </Button>
        </Card.Footer>
      </Card>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={previewVisible}
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
