import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams, useRouteMatch } from "react-router";
import imageHelper from "../../helpers/imageHelper";
import BookService from "../../services/BookService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Header from "../Header/Header";
import "./BookReader.scss";

export default function BookReader() {
  const { bookSlug, chapterId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    BookService.getChapterBySlug(bookSlug, chapterId).then((response) => {
      const { data } = response.data;
      setData(data);
    });
    return () => {};
  }, [bookSlug, chapterId]);

  return (
    <div className="reader">
      <div className="reader__header">
        <Header />
      </div>
      {/*  This body contains all image inside */}
      <Container className="reader__body">
        {/* Breadcrumb */}
        <Breadcrumb data={[{ url: "/", value: "Trang chủ" }]} />
        {data &&
          data.content.map((e, i) => {
            return (
              <Row key={i}>
                <Col></Col>
                <Col sm={12} md={10} lg={8}>
                  <img
                    src={imageHelper.getRawResourceUrl(e)}
                    alt={`resource id ${e}`}
                    className="reader__image"
                  />
                </Col>
                <Col></Col>
              </Row>
            );
          })}

        {/* Footer shows the navigation to another episode, things, links,... */}
        <div className="reader__footer">
          
        </div>
      </Container>
    </div>
  );
}
