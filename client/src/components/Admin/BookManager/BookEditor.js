import React, { useEffect, useState } from "react";
import {
  Form,
  Table,
  Container,
  Button,
  Col,
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

function Tag({ id, onClick, data }) {
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

  const [error, setError] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [isVisibleTagDialog, setVisibleTagDialog] = useState(false);
  const [isVisibleThumbnailSelect, setVisibleThumbnailSelect] = useState(false);
  const [isVisibleBookChapterCreate, setIsVisibleBookChapterCreate] =
    useState(false);
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");

  const { url } = useRouteMatch();

  useEffect(() => {
    // Get book by book slug
    BookService.getBookBySlug(bookId)
      .then((response) => {
        const { data, chapters } = response.data;
        setBookData(data);
        setChapterData(chapters);

        setTitle(data.title);
        setDescription(data.description);
        setTags(data.tags);
      })
      .catch((err) => {
        // Not found or error
        setError(err.response);
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

  const handleTagSelectorSubmit = (e) => {
    e.preventDefault();
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
          <h1 className="text-secondary">
            <Link
              className="link text-secondary"
              to={`/truyen/${bookData._id}`}
            >
              {bookData.title}
            </Link>
          </h1>
          <Form className="editor" onSubmit={handleOnSubmit}>
            <div className="editor__header">
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
                    <ResourceImage id={bookData.thumbnail} />
                    <small>Nhấn vào ảnh bìa để thay đổi</small>
                  </div>
                </Form.Group>
              </Col>

              <Col sm={12} lg={8} className="editor__header--secondary">
                <Form.Group className="editor__title">
                  <Form.Label>Tiêu đề</Form.Label>
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
                </Form.Group>
                <Form.Group className="editor__password">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={({ target }) => {
                      setPassword(target.value);
                    }}
                  />

                  <Form.Text className="text-muted">
                    Thiết lập mật khẩu cho truyện của bạn để giới hạn nội dung
                  </Form.Text>
                </Form.Group>
              </Col>
            </div>
            <div className="editor__body">
              <Form.Group>
                <Form.Label>Giới thiệu</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
                <Form.Text className="text-muted">
                  Giới thiệu về truyện của bạn ở đây
                </Form.Text>
              </Form.Group>
              <div className="d-flex flex-row-reverse">
                <Button variant="success" type="submit">
                  Lưu
                </Button>
              </div>
            </div>
          </Form>

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
}
