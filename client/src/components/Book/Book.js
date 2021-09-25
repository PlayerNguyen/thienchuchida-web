import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import BookService from "../../services/BookService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Book.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Link, useRouteMatch } from "react-router-dom";
import Config from "../../config/server.config";
import Header from "../Header/Header";
import imageHelper from "../../helpers/imageHelper";
import Thumbnail from "../General/Thumbnail";
import { Container, Row, Col } from "react-bootstrap";
import momentHelper from '../../helpers/momentHelper'

function Chapter({ data, bookId }) {
  const { url } = useRouteMatch();

  return (
    <Col sm={12} md={3} className="mb-3">
      <Link to={`${url}/${data && data.slug}`} className="text-decoration-none">
        {/* Thumbnail */}
        <Col>
          <Thumbnail
            src={imageHelper.getRawResourceUrl(data && data.thumbnail)}
            alt={`Chapter ${data && data._id} thumbnail`}
          />
        </Col>
        {/* Chapter info */}
        <Col>
          <Col>
            <h3 className="mt-2 fw-bold text-light ">{data && data.name}</h3>
          </Col>
          {/* Views statistic */}
          <Col>
            <span className="text-light p-2">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span className="text-light p-2">{data.views}</span>
          </Col>
          {/* Last updated */}
          <Col>
            <span className="text-light p-2">
              <FontAwesomeIcon icon={faClock} />
            </span>
            <span className="text-light p-2">{momentHelper(data.updatedAt).fromNow(false)}</span>
          </Col>
        </Col>
      </Link>
    </Col>
  );
}

export default function Book() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookInfo, setBookInfo] = useState(null);
  const [chapters, setChapters] = useState(null);
  const { bookSlug } = useParams();
  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    BookService.getBookBySlug(bookSlug)
      .then(({ data }) => {
        const book = data.data;
        if (!book) {
          history.push("/");
        }
        // Set a book info
        setBookInfo(book);
        setChapters(data.chapters);
      })
      .finally(() => {
        // Set loading to false to render
        setIsLoading(false);
      });
  }, [bookSlug, history]);

  return (
    <div className="book__wrapper">
      <Header />
      <Container fluid="sm" className="book__container">
        {!isLoading ? (
          <>
            <Row>
              <Breadcrumb
                data={[
                  { url: "/", value: "Trang chủ" },
                  {
                    url: `/truyen/${bookInfo && bookInfo.slug}`,
                    value: `${bookInfo && bookInfo.title}`,
                  },
                ]}
              />
            </Row>
            {/* Header */}
            <Row>
              <Col sm={12} md={6}>
                <Thumbnail
                  className="thumbnail"
                  src={
                    bookInfo && bookInfo.thumbnail
                      ? imageHelper.getRawResourceUrl(bookInfo.thumbnail)
                      : Config.DEFAULT_THUMBNAIL
                  }
                  alt="thumbnail"
                />
              </Col>
              <Col sm={12} md={6} className="mt-3">
                <h1 className="text-light fw-bold">
                  {bookInfo && bookInfo.title}
                </h1>
                <p className="text-light">{bookInfo && bookInfo.description}</p>
                <Row>
                  <Col sm={6} md={3} lg={2}>
                    <p className="text-light fw-bold">Tác giả </p>
                  </Col>
                  <Col sm={6} md={9} lg={10}>
                    <p className="text-light">Tên tác giả</p>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6} md={3} lg={2}>
                    <p className="text-light fw-bold">Thẻ</p>
                  </Col>
                  <Col sm={6} md={9} lg={10}>
                    {bookInfo &&
                      bookInfo.tags &&
                      bookInfo.tags.map((tag) => {
                        return (
                          <span className="text-light m-2" key={tag._id}>
                            {tag.name}
                          </span>
                        );
                      })}
                  </Col>
                </Row>
              </Col>
              <Col></Col>
            </Row>
            {/* Chapter list */}
            <Row className="mt-5">
              <Col sm={12}>
                <h1 className="text-light fw-bold">Tập truyện</h1>
              </Col>
              <Row className="mt-3" sm={12}>
                {chapters &&
                  chapters.data &&
                  chapters.data.map((e) => {
                    return <Chapter data={e} key={e._id} />;
                  })}
              </Row>
            </Row>
          </>
        ) : (
          <h1 className="text-light text-center">Đang tải nội dung...</h1>
        )}
      </Container>
    </div>
  );
}
