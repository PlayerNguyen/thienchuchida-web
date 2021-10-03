import { faClock, faEye, faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import momentHelper from "../../helpers/momentHelper";
import "./CardItem.scss";
import Thumbnail from "./Thumbnail";
import { Container, Row, Col } from "react-bootstrap";
import numberHelper from "../../helpers/numberHelper";

export default function CardItem({ data }) {
  return (
    <Col xs={12} lg={6} className="mb-4">
      <Link className="bookcard" to={`/truyen/${data ? data.slug : null}`}>
        <div className="bookcard__body ">
          <Thumbnail id={data.thumbnail} alt={`thumbnail `} height={"200px"} />
          <div className="bookcard__property--wrapper">
            <div className="bookcard__property">
              <div className="bookcard__property--bottom">
                <Container>
                  <Row>
                    {/* Title */}
                    <Col xs={12} className="bookcard__title mb-2">
                      <span>{data && data.title}</span>
                    </Col>
                    {/* description */}
                    <Col xs={12} className="bookcard__description fs-6 mb-2">
                      <span>
                        {data && data.description.indexOf(" ", 40) > -1
                          ? data.description.substring(
                              0,
                              data.description.indexOf(" ", 40)
                            ) + "..."
                          : data.description}
                      </span>
                    </Col>
                    {/* Tag info */}
                    <Col xs={12} className="text-light fw-light">
                      <Row>
                        <Col xs={3}>
                          <span style={{ marginRight: "12px" }}>
                            <FontAwesomeIcon icon={faEye} />
                          </span>
                          <span>
                            {data && numberHelper.shortenNumber(data.views, 2)}
                          </span>
                        </Col>
                        <Col xs={4}>
                          <span style={{ marginRight: "12px" }}>
                            <FontAwesomeIcon icon={faClock} />
                          </span>
                          <span>
                            {momentHelper(data && data.updatedAt).fromNow(true)}
                          </span>
                        </Col>
                        <Col xs={5}>
                          <span style={{ marginRight: "12px" }}>
                            <FontAwesomeIcon icon={faUser} />
                          </span>
                          <span>{data && data.creator.display}</span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="bookcard__footer"></div> */}
      </Link>
    </Col>
  );
}
