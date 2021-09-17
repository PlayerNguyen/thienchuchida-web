import React, { useState, useEffect } from "react";
import { Card, Button, Modal, Col, Row } from "react-bootstrap";
import Config from "../../../config/server.config";
import ResourceService from "../../../services/ResourceService";
import "./ResourceItem.scss";
import ResourcePreviewModal from "./ResourcePreviewModal";

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

  const handleClosePreview = () => {
    setPreviewVisible(false);
  };

  return (
    <Col md={4} sm={12}>
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
      <ResourcePreviewModal
        data={data}
        visible={previewVisible}
        close={handleClosePreview}
      />
    </Col>
  );
}
