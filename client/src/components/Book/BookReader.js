import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import BookService from "../../services/BookService";
import ResourceImage from "../Admin/ResourceManager/ResourceImage";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Header from "../Header/Header";
import "./BookReader.scss";

export default function BookReader() {
  const { bookSlug, chapterId } = useParams();
  const [data, setData] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);
  console.log(data);

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
        <Row>
          <Col></Col>
          <Col sm={12} md={10} lg={8}>
            <Breadcrumb
              data={[
                { url: "/", value: "Trang chủ" },
                { url: "/", value: `${data && data.book.title}` },
                { url: `/${data && data.slug}`, value: data && data.name },
              ]}
            />
          </Col>
          <Col></Col>
        </Row>
        {data &&
          data.content.map((e, i) => {
            return (
              <Row key={i}>
                <Col></Col>
                <Col sm={12} md={10} lg={8} className="p-0">
                  <ResourceImage id={e} alt={`${data.name} - ${i}`} />
                </Col>
                <Col></Col>
              </Row>
            );
          })}

        {/* Footer shows the navigation to another episode, things, links,... */}
        <div className="reader__footer pt-3 pb-3">
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
          <Container>
            {/* Title */}
            <Row>
              <Col><h1 className="text-light fw-bold">Truyện liên quan</h1></Col>
            </Row>
            <Row>

            </Row>
          </Container>
        </div>
      </Container>
    </div>
  );
}
