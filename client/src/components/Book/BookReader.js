import React, { useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import BookService from "../../services/BookService";
import ResourceImage from "../Admin/ResourceManager/ResourceImage";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import Footer from "../Footer/Footer";
import "./BookReader.scss";
import { Helmet } from "react-helmet-async";
import { useInView } from "react-intersection-observer";

export default function BookReader() {
  const { bookSlug, chapterId } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [nextChapter, setNextChapter] = useState(null);

  useEffect(() => {
    setLoading(true);
    BookService.getChapterBySlug(bookSlug, chapterId)
      .then((response) => {
        const { data, nextChapter } = response.data;
        setData(data);
        setNextChapter(nextChapter);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      setData(null);
    };
  }, [bookSlug, chapterId]);

  return (
    <div className="reader">
      <Helmet>
        <title>{data && `${data.book.title} | ${data.name}`}</title>
        <meta name="description" content={data && data.book.description}></meta>
      </Helmet>
      <div className="reader__header">
        <Header />
      </div>
      {/*  This body contains all image inside */}
      <Container className="reader__body">
        {!loading ? (
          <>
            {/* Breadcrumb */}
            <Row>
              <Col></Col>
              <Col sm={12} md={10} lg={8}>
                <Breadcrumb
                  data={[
                    { url: "/", value: "Trang chủ" },
                    {
                      url: `/truyen/${data && data.book.slug}`,
                      value: `${data && data.book.title}`,
                    },
                    {
                      url: `/truyen/${data && data.book.slug}/${
                        data && data.slug
                      }`,
                      value: data && data.name,
                    },
                  ]}
                />
              </Col>
              <Col></Col>
            </Row>
            {/* Body content */}
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
            {/* Bottom Breadcrumb */}
            <Row>
              <Col></Col>
              <Col sm={12} md={10} lg={8}>
                <Breadcrumb
                  data={[
                    { url: "/", value: "Trang chủ" },
                    {
                      url: `/truyen/${data && data.book.slug}`,
                      value: `${data && data.book.title}`,
                    },
                    {
                      url: `/truyen/${data && data.book.slug}/${
                        data && data.slug
                      }`,
                      value: data && data.name,
                    },
                  ]}
                />
              </Col>
              <Col></Col>
            </Row>
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
                  <Col>
                    <h1 className="text-light fw-bold">Truyện liên quan</h1>
                  </Col>
                </Row>
                <Row></Row>
              </Container>
            </div>
          </>
        ) : (
          null
        )}
        <div>
          <Footer />
        </div>
      </Container>
    </div>
  );
}
