import { faClock, faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import momentHelper from "../../helpers/momentHelper";
import "./CardItem.scss";
import Thumbnail from "./Thumbnail";

export default function CardItem({ data }) {
  return (
    <Col md={12} lg={6}>
      <Link className="bookcard" to={`/truyen/${data ? data.slug : null}`}>
        <div className="bookcard__body ">
          <div className="bookcard__body__thumbnail"></div>
          <Thumbnail id={data.thumbnail} alt={`thumbnail `} height={"200px"} />
        </div>
        <div className="bookcard__footer">
          <span className="bookcard__footer__title">
            {data.title ? data.title : `Untitled`}
          </span>
          <div className="bookcard__footer__information">
            <div>
              <span>
                <FontAwesomeIcon icon={faEye} />
              </span>
              <span>{data && data.views}</span>
            </div>
            <div>
              <span>
                <FontAwesomeIcon icon={faClock} />
              </span>
              <span>{data && momentHelper(data.updatedAt).fromNow()}</span>
            </div>
          </div>
        </div>
      </Link>
    </Col>
  );
}
