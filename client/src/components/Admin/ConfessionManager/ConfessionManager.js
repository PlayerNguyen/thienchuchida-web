import React, { useState, useEffect } from "react";
import { Container, Row, Col, Accordion, Button } from "react-bootstrap";
import ConfessionService from "../../../services/ConfessionService";
import { Link } from "react-router-dom";
import momentHelper from "../../../helpers/momentHelper";
import useClipboard from "react-use-clipboard";
import toastHelper from "../../../helpers/toastHelper";

function ConfessionItem({
  index,
  item,
  setConfessions,
  confessions,
  totalItems,
  setTotalItems,
}) {
  const [isCopied, setCopied] = useClipboard(item.content, {
    successDuration: 1000,
  });

  const handleSeenItem = (item) => {
    ConfessionService.revealConfession(item._id).then((response) => {
      // After this step, set it to confessions
      setConfessions(
        confessions.map((e) => {
          if (e._id === item._id) {
            return { ...e, seen: true };
          }
          return e;
        })
      );
    });
  };

  const handleCopyContent = () => {
    setCopied();
  };

  const handleRemove = () => {
    ConfessionService.deleteConfession(item._id).then(response => {
      const {message} = response.data;
      toastHelper.success(message);
      setConfessions(confessions.filter (confession => confession._id !== item._id))
      setTotalItems(totalItems - 1)
    })
  }

  return (
    <Accordion.Item
      key={index}
      eventKey={index}
      onClick={(_) => handleSeenItem(item)}
    >
      <Accordion.Header className="ff-normal">
        <span className={`${!item.seen && "fw-bolder"}`}>
          # {totalItems - index} - {item.author.display}
        </span>
      </Accordion.Header>
      <Accordion.Body>
        <Container fluid>
          <Row className="mb-3">
            <Col md={2} sm={12} className="text-secondary">
              Người gửi
            </Col>
            <Col md={10} sm={12} className="">
              <Link to="/">{item.author.display}</Link>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={2} sm={12} className=" text-secondary">
              Nội dung
            </Col>
            <Col md={10} sm={12} className="">
              <Row>
                <Col>{item.content}</Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={2} className="text-secondary">
              Thời gian
            </Col>
            <Col md={10} className="">
              <Row>
                <Col xs={12}>{momentHelper(item.createdAt).fromNow()}</Col>
                <Col className="text-secondary" xs={12}>
                  {momentHelper(item.createdAt).format("LLLL")}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={2} className="text-secondary">
              Tác vụ
            </Col>
            <Col md={10} className="">
              <Row>
                <Col xs={12} className="d-flex gap-1">
                  <Button
                    variant="primary"
                    onClick={handleCopyContent}
                    disabled={isCopied}
                  >
                    {isCopied ? `Đã sao chép` : `Sao chép`}
                  </Button>
                  <Button variant="danger" onClick={handleRemove}>Xoá</Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default function ConfessionManager() {
  const [confessions, setConfessions] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [eachItem] = useState(5);
  const [limit, setLimit] = useState(5);
  const [offset] = useState(0);
  // const [highlightUnread, setHighlightUnreal] = useState(false);
  const [sort] = useState("-createdAt");

  useEffect(() => {
    ConfessionService.fetchConfession(limit, offset, sort).then((response) => {
      // console.log(response)
      const { data, totalItems } = response.data;
      // console.log(data);
      setTotalItems(totalItems);
      // console.log(totalItems)
      setConfessions(data);
    });
  }, [limit, offset, sort]);

  const handleExpandList = () => {
    setLimit(limit + eachItem);
    // setOffset()
  };

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

      {/* <Row className="mb-3">
        <Col>
          <Button onClick={handleToggleHighlightUnread}>{highlightUnread ? `Hiển thị tất cả` : `Hiển thị chưa đọc`}</Button>
        </Col>
      </Row> */}

      <Accordion defaultItemKey="0">
        {confessions &&
          confessions.map((item, index) => {
            return (
              <ConfessionItem
                index={index}
                item={item}
                setConfessions={setConfessions}
                confessions={confessions}
                totalItems={totalItems}
                setTotalItems={setTotalItems}
              />
            );
          })}
      </Accordion>
      {confessions && confessions.length < totalItems && (
        <div className="text-center mt-2">
          <Button variant="link" onClick={handleExpandList}>
            Xem thêm
          </Button>
        </div>
      )}
    </Container>
  );
}
