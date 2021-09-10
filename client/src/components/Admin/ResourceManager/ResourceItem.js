import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import Config from "../../../config/server.config";
import ResourceService from "../../../services/ResourceService";
import "./ResourceItem.scss"
export default function ResourceItem({ id, selected, onClick, disableInfo }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    ResourceService.getResourceMetadata(id)
      .then((res) => {
        const { data } = res.data;
        setData(data);
        console.log(data);
      })
      .catch(() => {});
  }, [id]);

  return (
    <Card
      className={`resourceitem ${selected ? `resourceitem--selected` : ``}`}
      onClick={onClick}
    >
      <div className="resourceitem__thumbnail">
        <Card.Img
          src={
            data
              ? `${Config.SERVER_API_URL}/resources/${data._id}/raw`
              : Config.DEFAULT_THUMBNAIL
          }
          alt="A thumbnail for resource"
        />
      </div>

      {!disableInfo && (
        <Card.Body>
          <Card.Title>{data && data.originalName}</Card.Title>
          <span>Text</span>
        </Card.Body>
      )}
    </Card>
  );
}
