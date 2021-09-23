import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import imageHelper from "../../helpers/imageHelper";
import BookService from "../../services/BookService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Header from "../Header/Header";
import "./BookReader.scss";

export default function BookReader() {
  const { bookSlug, chapterId } = useParams();
  const [data, setData] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  useEffect(() => {
    BookService.getChapterBySlug(bookSlug, chapterId).then((response) => {
      const { data, nextChapter } = response.data;
      // console.log(data);
      setData(data);
      // console.log(nextChapter);
      setNextChapter(nextChapter);
    });
    return () => {
      setData(null);
    };
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
        <div className="reader__footer mt-3">
          <Row>
            <Col></Col>
            <Col className="d-flex flex-row-reverse" sm={12} md={10} lg={8}>
              {nextChapter && (
                <Link to={`/truyen/${bookSlug}/${nextChapter.slug}`}>
                  <Button>Tập tiếp theo</Button>
                </Link>
              )}
            </Col>
            <Col></Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
