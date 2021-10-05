import React, { useEffect, useState } from "react";
import BookService from "../../services/BookService";
import "./Home.scss";
import Header from "../Header/Header";
import { Container, Row, Col } from "react-bootstrap";
import CardItem from "../General/CardItem";
import SettingService from "../../services/SettingService";
import NotifyService from "../../services/NotifyService";
import Footer from "../Footer/Footer";
import NotifyCard from "../NotifyCard/NotifyCard";

export default function Home() {
  const [latest, setLatestUpdate] = useState(null);
  const [slogan, setSlogan] = useState("");
  const [notifies, setNotifies] = useState(null);

  useEffect(() => {
    // Load book
    BookService.getLatestUpdateBook(4, 1).then((response) => {
      const { data } = response.data;
      setLatestUpdate(data);
    });
    // Load slogan
    SettingService.getSetting("slogan").then((response) => {
      const { value } = response.data;
      setSlogan(value);
    });
    // Notify
    NotifyService.fetchNotify().then((response) => {
      const { data } = response.data;
      setNotifies(data);
    });
  }, []);

  return (
    <div>
      <div className="home__header">
        <Header />
      </div>
      <Container fluid="sm" className="home__container">
        <Container className="home__slogan fw-bold fs-5 text-light">
          <h1>{slogan}</h1>
          <h3>Sub-slogan with love</h3>
        </Container>
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
                <h1 className="text-light">Bảng tin</h1>
              </Col>
            </Row>
            <Row style={{ maxHeight: "425px", overflow: "auto" }}>
              <NotifyCard
                notifyTitle={`Thông báo #1`}
                notifyContext={`  Nội dung thông báo rất nhiều và mình có thể expand nó ra như
                  thế này. Tuy nhiên nó sẽ phải overflow`}
              />
              <NotifyCard
                notifyTitle={`Thông báo #2`}
                notifyContext={`  Nội dung thông báo rất nhiều và mình có thể expand nó ra như
                  thế này. Tuy nhiên nó sẽ phải overflow`}
              />
              <NotifyCard
                notifyTitle={`Thông báo #3`}
                notifyContext={`  Nội dung thông báo rất nhiều và mình có thể expand nó ra như
                  thế này. Tuy nhiên nó sẽ phải overflow`}
              />
              <NotifyCard
                notifyTitle={`Thông báo #3`}
                notifyContext={`  Nội dung thông báo rất nhiều và mình có thể expand nó ra như
                  thế này. Tuy nhiên nó sẽ phải overflow`}
              />
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
