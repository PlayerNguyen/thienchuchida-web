import React, { useEffect, useState } from "react";
// import Config from "../../config/server.config";
import BookService from "../../services/BookService";
import "./Home.scss";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faClock } from "@fortawesome/free-regular-svg-icons";
// import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Header from "../Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import CardItem from "../General/CardItem";


export default function Home() {
  const [latest, setLatestUpdate] = useState(null);

  useEffect(() => {
    BookService.getLatestUpdateBook(4, 1).then((response) => {
      const { data } = response.data;
      setLatestUpdate(data);
    });
  }, []);

  return (
    <div>
      <div className="home__header">
        <Header />
      </div>
      <Container fluid="sm" className="home__container">
        <Row className="home__content">
          {/* Content */}
          <Col sm={12} md={8}>
            <Col className="category">
              <Row className="category__header">
                <h1 className="text-light">Truyện mới cập nhật</h1>
              </Row>
              <Row>
                {latest &&
                  latest.map((e, i) => {
                    return <CardItem key={i} data={e} />;
                  })}
              </Row>
            </Col>
          </Col>

          {/* Aside bar */}
          <Col sm={12} md={4}>
            <Row>
              <h1 className="text-light">Thông báo</h1>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
