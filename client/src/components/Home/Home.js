import React, { useEffect, useState } from "react";
// import Config from "../../config/server.config";
import BookService from "../../services/BookService";
import "./Home.scss";
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
              <Col>
                <h1 className="text-light">Thông báo</h1>
              </Col>

              <Col>
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ftccd.thienchuchida&tabs=timeline&width=0&height=0&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=1116623828358912"
                  width="300"
                  height="500"
                  style={{ border: "none", overflow: "hidden" }}
                  scrolling="no"
                  frameborder="0"
                  title={`facebook widget`}
                  allowfullscreen="true"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
