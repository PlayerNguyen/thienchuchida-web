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
  const [subSlogan, setSubSlogan] = useState("");
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

    SettingService.getSetting("subslogan").then((response) => {
      const { value } = response.data;
      setSubSlogan(value);
    });
    // Notify
    NotifyService.fetchNotify().then((response) => {
      const { data } = response.data;
      setNotifies(data);
    });
  }, []);

  const handleRemoveNotify = (notify) => {
    setNotifies(notifies.filter((ele) => ele._id !== notify._id));
  };

  const handleUpdateNotify = (updatedNotify) => {
    setNotifies(
      notifies.map((notify) => {
        if (notify._id === updatedNotify._id) {
          const { title, context, __v } = updatedNotify;
          return {
            title,
            context,
            __v,
          };
        }
        return notify;
      })
    );
  };

  return (
    <div>
      <div className="home__header">
        <Header />
      </div>
      <Container fluid="sm" className="home__container">
        <Container className="home__slogan fw-bold fs-5 text-light">
          <h1 className="ff-normal">{slogan}</h1>
          <h2 className="ff-handwriting">{subSlogan}</h2>
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
              {notifies &&
                notifies.map((notify, index) => {
                  return (
                    <NotifyCard
                      key={notify._id}
                      notifyId={notify._id}
                      notifyTitle={notify.title}
                      notifyContext={notify.context}
                      onRemove={(_) => handleRemoveNotify(notify)}
                      onUpdate={handleUpdateNotify}
                    />
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
