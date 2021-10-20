import { faArchive, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import ResourceService from "../../../services/ResourceService";
import ResourceImage from "./ResourceImage";
import "./ResourceItem.scss";
import ResourcePreviewModal from "./ResourcePreviewModal";
import bytes from "bytes";
import momentHelper from "../../../helpers/momentHelper";

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
    // Receive the data of current resource
    ResourceService.getResourceMetadata(id)
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch(() => {});

    // Clean up not to be lagged
    return () => {
      setData(null);
      setPreviewVisible(false);
    };
  }, [id]);

  const handleClosePreview = () => {
    setPreviewVisible(false);
  };

  return (
    <Col sm={12} md={6} lg={3} className="mb-2">
      <Card
        className={`resourceitem w-100 ${
          selected ? `resourceitem--selected` : ``
        }`}
        onClick={onClick}
      >
        <ResourceImage
          id={data && data._id}
          height={minimizeThumbnail ? "150px" : "auto"}
          onClick={() => setPreviewVisible(true)}
        />

        {!disableInfo && (
          <Card.Body>
            <Card.Title>{data && data.originalName}</Card.Title>
            <div className="text-secondary">
              <Row>
                <Col xs={3}>
                  <FontAwesomeIcon icon={faArchive} />
                </Col>
                <Col xs={9}>{data && bytes(Number(data.size))}</Col>
              </Row>
              <Row>
                <Col xs={3}>
                  <FontAwesomeIcon icon={faClock} />
                </Col>
                <Col xs={9}>
                  {data && momentHelper(data.createdAt).fromNow()}
                </Col>
              </Row>
            </div>
          </Card.Body>
        )}
        <Card.Footer>
          <Button
            onClick={() => {
              setPreviewVisible(true);
            }}
            variant="link"
            size="sm"
          >
            Xem
          </Button>
          <Button onClick={() => {
            onSelect(data)
          }} variant="link" size="sm">
            {!selected ? `Chọn` : `Huỷ chọn`}
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
