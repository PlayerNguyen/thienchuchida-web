import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import BookService from "../../services/BookService";
import CommentService from "../../services/CommentService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Book.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock, faComment } from "@fortawesome/free-regular-svg-icons";
import { Link, useRouteMatch } from "react-router-dom";
import Header from "../Header/Header";
import Thumbnail from "../General/Thumbnail";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import momentHelper from "../../helpers/momentHelper";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import toastHelper from "../../helpers/toastHelper";
import LazyLoad from "react-lazyload";
import Footer from "../Footer/Footer";
import { Helmet } from "react-helmet-async";

function Chapter({ data, bookId }) {
  const { url } = useRouteMatch();

  return (
    <Col sm={12} md={6} lg={3} className="mb-3">
      <Link to={`${url}/${data && data.slug}`} className="text-decoration-none">
        {/* Thumbnail */}
        <Col>
          <Thumbnail
            id={data.thumbnail}
            alt={`Chapter ${data && data._id} thumbnail`}
            height={`300px`}
          />
        </Col>
        {/* Chapter info */}
        <Col>
          <Row>
            <Col>
              <h3 className="mt-2 fw-bold text-light ">{data && data.name}</h3>
            </Col>
          </Row>
          {/* Views statistic */}
          <Row className="text-secondary">
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
              <span className="text-light p-2">
                {momentHelper(data.updatedAt).fromNow(true)}
              </span>
            </Col>
          </Row>
        </Col>
      </Link>
    </Col>
  );
}

function CommentSection({ comment, index, persistUser, handleRemoveComment }) {
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    comment && setContent(comment.content);
  }, [comment]);

  const handleToggleEditMode = () => {
    setEdit(!edit);
    if (edit) {
      handleUpdateComment();
    }
  };

  const handleChangeEditContext = ({ target }) => {
    setContent(target.value);
  };

  // useEffect(() => {
  //   if (!edit && content !== comment.content) {

  //   }
  // }, [edit, content, comment]);

  const handleUpdateComment = () => {
    CommentService.updateComment(comment._id, content).then((response) => {
      const { message } = response.data;
      // Put it to success method
      toastHelper.success(message);
      // Then set it to comment content
    });
  };

  return (
    <LazyLoad>
      <Col
        className="text-light comment__wrapper mb-4"
        key={index}
        md={10}
        sm={12}
      >
        <Row>
          {/* Left side, contains information */}
          <Col md={10} sm={4}>
            {/* Header */}
            <Row>
              <Col>
                <span className="fw-bold comment__username">
                  {comment.user.display}
                </span>
                <span
                  className="text-secondary"
                  title={momentHelper(comment.createdAt).format("LLLL")}
                >
                  {momentHelper(comment.createdAt).fromNow(false)}
                </span>
              </Col>
            </Row>
            {/* Body */}
            <Row>
              <Col>
                {!edit ? (
                  content
                ) : (
                  <Form>
                    <Form.Group>
                      <Form.Control
                        as="textarea"
                        value={content}
                        onChange={handleChangeEditContext}
                      ></Form.Control>
                    </Form.Group>
                  </Form>
                )}
              </Col>
            </Row>
          </Col>
          {/* right side, modify */}
          <Col md={2} sm={4}>
            {!persistUser ? null : (
              <Row>
                <Col></Col>
                {(persistUser._id === comment.user._id ||
                  persistUser.admin) && (
                  <Col xs={4}>
                    <span className="c-pointer" onClick={handleToggleEditMode}>
                      {!edit ? `Sửa` : `Xong`}
                    </span>
                  </Col>
                )}

                {(persistUser._id === comment.user._id ||
                  persistUser.admin) && (
                  <Col xs={4} className="text-danger">
                    <span
                      className="c-pointer"
                      onClick={() => {
                        handleRemoveComment(comment._id);
                      }}
                    >
                      Xoá
                    </span>
                  </Col>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    </LazyLoad>
  );
}

export default function Book() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookInfo, setBookInfo] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [comments, setComments] = useState(null);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [commentInput, setCommentInput] = useState("");
  // const [delay, setDelay] =

  const { bookSlug } = useParams();
  const history = useHistory();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const persistUser = useSelector((state) => state.auth.persistUser);

  useEffect(() => {
    setIsLoading(true);
    setIsCommentLoading(true);
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
    // Clean up this component
    return () => {
      setBookInfo(null);
      setIsLoading(true);
      setChapters(null);
    };
  }, [bookSlug, history]);

  useEffect(() => {
    if (bookInfo) {
      // document.title = `${bookInfo.title} | Thiên Chu Chi Dạ`;
      setIsCommentLoading(true);
      // Then fetch comments of this book
      handleFetchComment(bookInfo);
      // Clean up after close component
      return () => {
        setComments(null);
      };
    }
  }, [bookInfo]);

  const handleFetchComment = (bookInfo) => {
    CommentService.getCommentsFromBook(bookInfo._id)
      .then((response) => {
        const { data } = response.data;
        setComments(data);
        // console.log(data);
      })
      .finally(() => {
        setIsCommentLoading(false);
      });
  };

  const handleOnChangeCommentValue = ({ target }) => {
    setCommentInput(target.value);
  };

  const handleSubmitComment = (e) => {
    // Cancel navigation
    e.preventDefault();
    // Then submit this comment
    CommentService.createComment(bookInfo._id, commentInput)
      .then((response) => {
        const { message } = response.data;
        // Send a message
        toastHelper.success(message);
        // Refresh a who data list
        handleFetchComment(bookInfo);
      })
      .finally(() => {
        setCommentInput("");
      });
  };

  const handleRemoveComment = (id) => {
    // console.log(id);
    CommentService.deleteComment(id).then((response) => {
      const { message } = response.data;
      toastHelper.success(message);
      // Fetch
      handleFetchComment(bookInfo);
    });
  };

  return (
    <div className="book__wrapper">
      <Helmet>
        <title>{bookInfo && bookInfo.title}</title>
        <meta
          name="description"
          content={bookInfo && bookInfo.description}
        ></meta>
      </Helmet>
      <div>
        <Header />
      </div>
      <Container fluid="sm" className="book__container">
        {!isLoading ? (
          <>
            <Row>
              <Col>
                <Breadcrumb
                  data={[
                    { url: "/", value: "Trang chủ" },
                    {
                      url: `/truyen/${bookInfo && bookInfo.slug}`,
                      value: `${bookInfo && bookInfo.title}`,
                    },
                  ]}
                />
              </Col>
            </Row>
            {/* Header */}
            <Row>
              <Col sm={12} md={6}>
                <Thumbnail
                  className="thumbnail"
                  id={bookInfo && bookInfo.thumbnail}
                  alt="thumbnail"
                  height={`300px`}
                />
              </Col>
              <Col sm={12} md={6} className="mt-3">
                <Row>
                  <Col>
                    <h1 className="text-light fw-bold">
                      {bookInfo && bookInfo.title}
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="text-light">
                      {bookInfo && bookInfo.description}
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p
                      className="text-light fw-bold d-inline-block"
                      style={{ marginRight: "2em" }}
                    >
                      Tác giả
                    </p>

                    <p className="text-light d-inline-block ">
                      {bookInfo && bookInfo.author}
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <p
                      className="text-light fw-bold d-inline-block"
                      style={{ marginRight: "2em" }}
                    >
                      Thẻ
                    </p>

                    {bookInfo && bookInfo.tags && bookInfo.tags.length > 0 ? (
                      bookInfo.tags.map((tag) => {
                        return (
                          <span className="text-light m-2" key={tag._id}>
                            {tag.name}
                          </span>
                        );
                      })
                    ) : (
                      <span className="text-light">Không có thẻ</span>
                    )}
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
              <Col className="mt-3" sm={12}>
                <Row>
                  {chapters && chapters.data && chapters.data.length > 0 ? (
                    chapters.data.map((e) => {
                      return <Chapter data={e} key={e._id} />;
                    })
                  ) : (
                    <Container className="text-center text-light p-5">
                      <h1>
                        Hiện tại chưa có truyện nào được cập nhật, hãy thử quay
                        lại sau.
                      </h1>
                    </Container>
                  )}
                </Row>
              </Col>
            </Row>
            {/* Comment list */}
            <Row className="mt-5">
              <Col sm={12}>
                <h1 className="text-light fw-bold">Bình luận</h1>
              </Col>
              <Col className="mt-3 mb-3" sm={12}>
                <Container fluid="sm">
                  <Col className="text-light comment__wrapper mb-4">
                    <Row>
                      {/* Left side, contains information */}
                      <Col>
                        {/* Header */}
                        <Row>
                          <Col md={11}>
                            {/* Whether user are not logged in */}
                            {isSignedIn ? (
                              <Form onSubmit={handleSubmitComment}>
                                <Form.Group>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Nhập nội dung bình luận tại đây"
                                    value={commentInput}
                                    onChange={handleOnChangeCommentValue}
                                  />
                                </Form.Group>
                                <div className="d-flex flex-row-reverse mt-2">
                                  <Button
                                    type="submit"
                                    disabled={commentInput === ""}
                                  >
                                    <span style={{ marginRight: "1em" }}>
                                      <FontAwesomeIcon icon={faComment} />
                                    </span>
                                    <span>Bình luận</span>
                                  </Button>
                                </div>
                              </Form>
                            ) : (
                              <span className="text-secondary">
                                Bạn không thể bình luận khi chưa{" "}
                                <Link to="/dang-nhap">đăng nhập</Link>.
                              </span>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>

                  {isCommentLoading ? (
                    <Loading />
                  ) : (
                    comments.map((comment, index) => {
                      return (
                        <CommentSection
                          comment={comment}
                          index={index}
                          handleRemoveComment={handleRemoveComment}
                          persistUser={persistUser}
                        />
                      );
                    })
                  )}
                </Container>
              </Col>
            </Row>
          </>
        ) : (
          <Loading />
        )}
      </Container>
      <div>
        <Footer />
      </div>
    </div>
  );
}
