import React, { useEffect, useState } from "react";
import {
  Form,
  Table,
  Container,
  Button,
  Col,
  Row,
  ButtonGroup,
} from "react-bootstrap";
import "./Editor.scss";

import { useParams, useRouteMatch } from "react-router";
import BookService from "../../../services/BookService";
import { Link } from "react-router-dom";
import momentHelper from "../../../helpers/momentHelper";
import BookTagSelector from "./BookTagSelector";
import ResourceSelectModal from "../ResourceManager/ResourceSelectModal";

import { toast } from "react-toastify";
import BookChapterCreateModal from "./BookChapterCreateModal";
import ResourceImage from "../ResourceManager/ResourceImage";
import Editor from "../Editor/Editor";
import UnknownImage from "../../UnknownImage/UnknownImage";

function Tag({ onClick, data }) {
  return (
    <>
      {data && (
        <div className="tag" onClick={onClick}>
          <ButtonGroup aria-label={`Tag ${data && data.name}`}>
            <Button variant="outline-dark">{data && data.name}</Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
}

export default function BookEditor() {
  const { bookId } = useParams();
  //eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [isVisibleTagDialog, setVisibleTagDialog] = useState(false);
  const [isVisibleThumbnailSelect, setVisibleThumbnailSelect] = useState(false);
  const [isVisibleBookChapterCreate, setIsVisibleBookChapterCreate] =
    useState(false);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("...");

  const { url } = useRouteMatch();

  useEffect(() => {
    setLoading(true)
    // Get book by book slug
    BookService.getBookBySlug(bookId)
      .then((response) => {
        const { data, chapters } = response.data;
        console.log(data.description);
        setBookData(data);
        setChapterData(chapters);

        setTitle(data.title);
        // setDescription(data.description);
        setTags(data.tags);
        setAuthor(data.author);
      })
      .catch((err) => {
        // Not found or error
        setError(err.response);
        setLoading(false)
      });

    return () => {
      setTitle("");
      setBookData(null);
      setChapterData(null);
    };
  }, [bookId]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    Promise.all(
      tags.map((tag) => {
        return tag._id;
      })
    ).then((tagIdentifies) => {
      BookService.updateBook({
        _id: bookId,
        title,
        description,
        password,
        tags: tagIdentifies,
        author,
      })
        .then((response) => {
          const { data, message } = response.data;
          setBookData(data);
          toast.success(message);
        })
        .finally(() => {
          // Reset password field
          setPassword("");
        });
    });
  };

  const handleThumbnailChange = (e) => {
    BookService.updateBook({ _id: bookId, thumbnail: e }).then((response) => {
      const { data, message } = response.data;
      setBookData(data);
      toast.success(message);
    });
    setVisibleThumbnailSelect(false);
  };

  const handleTagDialogComplete = (selectedTags) => {
    setTags([...selectedTags]);
  };

  return (
    <div className="editor__wrapper">
      {error && error.status === 404 && (
        <Container className="text-center mt-3">
          <h1>Không tìm thấy truyện. </h1>
          <Link to={"/admin/quan-ly-truyen"} className="link link-primary">
            Trở về trang trước.
          </Link>
        </Container>
      )}
      {bookData && (
        <>
          <Row>
            <Col>
              <h1 className="text-secondary">
                <Link
                  className="link text-secondary"
                  to={`/truyen/${bookData._id}`}
                >
                  {bookData.title}
                </Link>
              </h1>
            </Col>
          </Row>

          <Row>
            <Container>
              <Form onSubmit={handleOnSubmit}>
                <Col sm={12} lg={6}>
                  <Form.Group
                    // as={`Col`}
                    className="editor__thumbnail editor__header--first"
                  >
                    <div
                      onClick={() => {
                        setVisibleThumbnailSelect(true);
                      }}
                    >
                      {bookData.thumbnail ? (
                        <ResourceImage id={bookData.thumbnail} height={200} />
                      ) : (
                        <UnknownImage height={200} />
                      )}
                      <small>Nhấn vào ảnh bìa để thay đổi</small>
                    </div>
                  </Form.Group>
                </Col>

                <Col className="mt-3">
                  <Container fluid="sm">
                    {/* Title section */}
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>
                        Tiêu đề
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          value={title}
                          onChange={({ target }) => {
                            setTitle(target.value);
                          }}
                        />
                        <Form.Text className="text-muted">
                          Tiêu đề của truyện, dùng để tìm kiếm.
                        </Form.Text>
                      </Col>
                    </Form.Group>

                    {/* Password section */}
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>
                        Mật khẩu
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={({ target }) => {
                            setPassword(target.value);
                          }}
                        />

                        <Form.Text className="text-muted">
                          Thiết lập mật khẩu cho truyện của bạn để giới hạn nội
                          dung
                        </Form.Text>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>
                        Giới thiệu
                      </Form.Label>
                      <Col sm={10}>
                        {/* <Form.Control
                          as="textarea"
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        /> */}
                        <Editor
                          data={bookData.description}
                          onDataUpdate={(data) => setDescription(data)}
                        />
                        <Form.Text className="text-muted">
                          Giới thiệu về truyện của bạn ở đây
                        </Form.Text>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>
                        Tác giả
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          value={author}
                          onChange={(e) => {
                            setAuthor(e.target.value);
                          }}
                        />
                        <Form.Text className="text-muted">
                          Tên tác giả của truyện
                        </Form.Text>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2}>
                        Thẻ
                      </Form.Label>
                      <Col sm={10}>
                        <Row>
                          <Col>
                            {tags &&
                              tags.map((e, i) => {
                                return <Tag key={i} data={e} />;
                              })}
                            <Button
                              variant={`dark`}
                              onClick={(e) => {
                                setVisibleTagDialog(true);
                              }}
                            >
                              Chỉnh sửa thẻ
                            </Button>
                          </Col>
                        </Row>
                        <Form.Text>
                          Bấm lưu để thay đổi chỉnh sửa về thẻ
                        </Form.Text>
                      </Col>
                    </Form.Group>

                    {/* <div className="d-flex flex-row-reverse">
                    </div> */}
                    <Form.Group as={Row} className="mb-3">
                      <Col sm={2}></Col>
                      <Col>
                        <Button variant="success" type="submit">
                          Lưu chỉnh sửa
                        </Button>
                      </Col>
                    </Form.Group>
                  </Container>
                </Col>
              </Form>
            </Container>
          </Row>

          {/* <Row>
            <Container>
              <Form onSubmit={handleTagSelectorSubmit}>
                <div>
                  {tags &&
                    tags.map((e, i) => {
                      return <Tag key={i} data={e} />;
                    })}
                  <Button
                    variant={`dark`}
                    onClick={(e) => {
                      setVisibleTagDialog(true);
                    }}
                  >
                    Chỉnh sửa thẻ
                  </Button>
                </div>
              </Form>
            </Container>
          </Row> */}

          <Form>
            <Form.Group className="editor__chapters">
              <h2>Danh sách các tập</h2>
              <div className="">
                <Button
                  onClick={() => {
                    setIsVisibleBookChapterCreate(true);
                  }}
                >
                  Thêm tập mới
                </Button>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Tên tập</th>
                    <th>Thời gian</th>
                    <th>Lượt xem</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {chapterData &&
                    chapterData.data.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{e.name}</td>
                          <td>{momentHelper(e.createdAt).fromNow()}</td>
                          <td className="text-secondary align-right">
                            {e.views}
                          </td>
                          <td>
                            <Button variant="link" href={`${url}/${e._id}/`}>
                              Chỉnh sửa
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Form.Group>
          </Form>

          <ResourceSelectModal
            visible={isVisibleThumbnailSelect}
            close={() => {
              setVisibleThumbnailSelect(false);
            }}
            onSelect={handleThumbnailChange}
            title={"Chọn ảnh bìa"}
          />

          <BookChapterCreateModal
            visible={isVisibleBookChapterCreate}
            onHide={() => {
              setIsVisibleBookChapterCreate(false);
            }}
            bookId={bookId}
          />

          <BookTagSelector
            visible={isVisibleTagDialog}
            tags={tags}
            close={() => {
              setVisibleTagDialog(false);
            }}
            onComplete={handleTagDialogComplete}
          />
        </>
      )}
    </div>
  );

  // <div>
  //   <Container>
  //     <Row>
  //       <Col>
  //         <h1 className="text-secondary ff-normal">{bookData && bookData.title}</h1>
  //       </Col>
  //     </Row>
  //     {/* Body container */}
  //     <Row>

  //     </Row>
  //   </Container>
  // </div>
  // );
}
