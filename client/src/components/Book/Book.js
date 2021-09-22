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

function Chapter({ data, bookId }) {
  const { url } = useRouteMatch();

  console.log(data);

  // return (
  //   <Link className="chapter" to={`${url}/${data && data.slug}`}>
  //     <div className="chapter__thumbnail">
  //       <img src={Config.DEFAULT_THUMBNAIL} alt="chapter thumbnail" />
  //     </div>
  //     <div className="chapter__footer">
  //       <div className="chapter__title title">{data && data.name}</div>
  //       <div className="chapter__views">
  //         <span>Views:</span>
  //         <span>{data && data.views}</span>
  //       </div>
  //     </div>
  //   </Link>
  // );

  return (
    <Col sm={12} md={3}>
      <Link to={`${url}/${data && data.slug}`}>
        <Col>
          <Thumbnail
            src={imageHelper.getRawResourceUrl(data && data.thumbnail)}
            alt={`Chapter ${data && data._id} thumbnail`}
          />
        </Col>
        <Col>
          <Col>
            <h3 className="mt-2 fw-bold text-light ">{data && data.name}</h3>
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
            <h1 className="text-light fw-bold">{bookInfo && bookInfo.title}</h1>
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
                <p className="text-light">Loại thẻ</p>
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
          <Col className="mt-3">
            {chapters &&
              chapters.data &&
              chapters.data.map((e) => {
                return <Chapter data={e} key={e._id} />;
              })}
          </Col>
        </Row>
      </Container>
    </div>
  );

  // return (
  //   <div className="book__wrapper">
  //     <Header />
  //     {isLoading ? (
  //       <></>
  //     ) : (
  //       <div className="book">
  //         <div className="book__header">
  //           <Breadcrumb
  //             data={[
  //               { url: "/", value: "Trang chủ" },
  //               {
  //                 url: `/truyen/${bookInfo && bookInfo.slug}`,
  //                 value: `${bookInfo && bookInfo.title}`,
  //               },
  //             ]}
  //           />
  //         </div>
  //         <div className="book__body">
  //           {/* Big thumbnail in left */}
  //           <div className="book__thumbnail">
  //             {/* <img
  //               className="thumbnail"
  //               src={
  //                 bookInfo && bookInfo.thumbnail
  //                   ? imageHelper.getRawResourceUrl(bookInfo.thumbnail)
  //                   : Config.DEFAULT_THUMBNAIL
  //               }
  //               alt="thumbnail"
  //             /> */}
  //             <Thumbnail
  //               src={
  //                 bookInfo && bookInfo.thumbnail
  //                   ? imageHelper.getRawResourceUrl(bookInfo.thumbnail)
  //                   : Config.DEFAULT_THUMBNAIL
  //               }
  //               alt={`${bookInfo.title} thumbnail`}
  //             />
  //           </div>
  //           {/* Info box in right */}
  //           <div className="book__infobox">
  //             <h1 className="book__title title title--medium">
  //               {bookInfo && bookInfo.title}
  //             </h1>
  //             <p className="book__description">
  //               {bookInfo && bookInfo.description}
  //             </p>
  //             <div className="book__status">
  //               <div>
  //                 <span>
  //                   <FontAwesomeIcon icon={faEye} />
  //                 </span>
  //                 <span className="bold">Tác giả</span>
  //                 <span>Tác giả</span>
  //               </div>

  //               <div>
  //                 <span>
  //                   <FontAwesomeIcon icon={faClock} />
  //                 </span>
  //                 <span>Cập nhật</span>
  //                 <span className="bold">2 giờ trước</span>
  //               </div>
  //               <div>
  //                 <span>
  //                   <FontAwesomeIcon icon={faHeart} />
  //                 </span>
  //                 <span>Yêu thích</span>
  //                 <span className="bold">150.303</span>
  //               </div>
  //               <div className="book__tags">
  //                 <span>
  //                   <FontAwesomeIcon icon={faTag} />
  //                 </span>
  //               </div>
  //             </div>
  //           </div>
  //         </div>

  //         <div className="chapterbox__outer">
  //           <h1 className="title title--large">Danh sách các tập</h1>
  //           <div className="chapterbox">
  //             {chapters &&
  //               chapters.data.map((ele, ind) => {
  //                 return <Chapter data={ele} key={ind} bookId={bookInfo._id} />;
  //               })}
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
}
