import React, { useState, useEffect } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import ConfessionService from "../../../services/ConfessionService";

export default function ConfessionManager() {
  const [confessions, setConfessions] = useState(null);
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [sort] = useState("-createdAt");

  useEffect(() => {
    ConfessionService.fetchConfession(limit, offset, sort).then((response) => {
      // console.log(response.data)
      const { data } = response.data;
      // console.log(data);
      setConfessions(data);
    });
  }, [limit, offset, sort]);

  return (
    <Container fluid="md">
      <Row className="mb-3">
        <Col xs={12}>
          <h1 className="fw-bold">Confession</h1>
        </Col>
        <Col>
          <h2 className="text-secondary">Quản lý confession</h2>
        </Col>
      </Row>
      <Accordion defaultItemKey="0">
        {confessions &&
          confessions.map((item, index) => {
            return (
              <Accordion.Item eventKey={index} onClick={_=>console.log(item)}>
                <Accordion.Header className="ff-normal">
                  <span className={!item.seen && "fw-bolder"}>#{item.position} bởi {item.author.display}</span>
                </Accordion.Header>
                <Accordion.Body>
                  <Container fluid>
                    <Row className="mb-3">
                      <Col md={2} sm={12} className="text-secondary">
                        Người gửi
                      </Col>
                      <Col md={10} sm={12} className="">
                        $username$
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={2} sm={12} className=" text-secondary">
                        Nội dung
                      </Col>
                      <Col md={10} sm={12} className="">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Reiciendis asperiores harum assumenda, nulla ex
                        iste cum fugit quasi distinctio sint sed eum quas optio
                        hic voluptatibus sapiente. Totam, eligendi consequatur!
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col md={2} className="text-secondary">
                        Thời gian
                      </Col>
                      <Col md={10} className="">
                        2 tiếng trước
                      </Col>
                    </Row>
                  </Container>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
      </Accordion>
    </Container>
  );
}
