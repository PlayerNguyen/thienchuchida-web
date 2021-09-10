import React, { useEffect, useState } from "react";
import { Form, Table, Container, Button, Badge } from "react-bootstrap";
import "./Editor.scss";
import ServerConfig from "../../../config/server.config";
import { useParams } from "react-router";
import BookService from "../../../services/BookService";
import { Link } from "react-router-dom";
import momentHelper from "../../../helpers/momentHelper";
import BookTagSelector from "./BookTagSelector";
import ResourceSelectModal from "../ResourceManager/ResourceSelectModal";

function Tag({ name }) {
  return (
    <div className="tag">
      <Button variant="outline-dark">{name}</Button>
    </div>
  );
}

export default function BookEditor() {
  const { bookSlug } = useParams();

  const [error, setError] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [title, setTitle] = useState("");
  const [isVisibleTagDialog, setVisibleTagDialog] = useState(false);
  const [isVisibleThumbnailSelect, setVisibleThumbnailSelect] = useState(false);
  const [tags, setTags] = useState([]);

  // console.log(bookSlug)

  useEffect(() => {
    // Get book by book slug
    BookService.getBookBySlug(bookSlug)
      .then((response) => {
        const { data, chapters } = response.data;
        setBookData(data);
        setTitle(data.title);
        setChapterData(chapters);
      })
      .catch((err) => {
        // Not found or error
        setError(err.response);
      });
  }, [bookSlug]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleOnTagBlur = (e) => {
    // setVisibleTagDialog(false);
    // TODO fix close without blur
  };

  const handleOnSubmit = () => {};

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
          <Form className="editor" onSubmit={handleOnSubmit}>
            <div className="editor__header">
              <Form.Group className="editor__thumbnail editor__header--first">
                <div
                  onClick={() => {
                    setVisibleThumbnailSelect(true);
                  }}
                >
                  <img src={ServerConfig.DEFAULT_THUMBNAIL} alt="" />
                </div>
              </Form.Group>
              <div className="editor__header--secondary">
                <Form.Group className="editor__title">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                  />
                  <Form.Text className="text-muted">
                    Tiêu đề của truyện, dùng để tìm kiếm.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="editor__password">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control type="password" />
                  <Form.Text className="text-muted">
                    Thiết lập mật khẩu cho truyện của bạn để giới hạn nội dung
                  </Form.Text>
                </Form.Group>
              </div>
            </div>
            <div className="editor__body">
              <Form.Group>
                <Form.Label>Giới thiệu</Form.Label>
                <Form.Control as="textarea" value={bookData.description} />
                <Form.Text className="text-muted">
                  Giới thiệu về truyện của bạn ở đây
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Thể loại</Form.Label>
                <div>
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag name={`Yaoi`} />
                  <Tag
                    name={`Thêm`}
                    onClick={(e) => {
                      setVisibleTagDialog(true);
                    }}
                  />
                </div>
                <BookTagSelector show={isVisibleTagDialog} />
              </Form.Group>
              <div class="d-flex flex-row-reverse">
                <Button variant="success" type="submit">
                  Lưu
                </Button>
              </div>
              <Form.Group className="editor__chapters">
                <h2>Danh sách các tập</h2>
                <div className="">
                  <Button>Thêm truyện</Button>
                </div>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
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
                          <tr>
                            <td></td>
                            <td>{e.name}</td>
                            <td>{momentHelper(e.createdAt).fromNow()}</td>
                            <td className="text-secondary align-right">
                              {e.views}
                            </td>
                            <td>
                              <div>
                                <Link to="/" className="m-5 link-primary">
                                  Sửa
                                </Link>
                                <Link to="/" className="link-danger">
                                  Xoá
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </Form.Group>
            </div>
          </Form>
          <ResourceSelectModal
            visible={isVisibleThumbnailSelect}
            close={() => {
              setVisibleThumbnailSelect(false);
            }}
          />
        </>
      )}
    </div>
  );
}
