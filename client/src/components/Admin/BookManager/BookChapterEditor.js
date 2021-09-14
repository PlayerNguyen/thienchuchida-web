import React, { useEffect, useState } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router";
import BookService from "../../../services/BookService";
import "./Editor.scss";
import ServerConfig from "../../../config/server.config";
import imageHelper from "../../../helpers/imageHelper";
import ResourceSelectModal from "../ResourceManager/ResourceSelectModal";

export default function BookChapterEditor() {
  const { bookId, chapterId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [visibleThumbnailSelect, setVisibleThumbnailSelect] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    BookService.getChapterById(bookId, chapterId).then((response) => {
      const { data } = response.data;
      setChapterData(data);
      console.log(data);
      setTitle(data.name);
    });
  }, [bookId, chapterId]);

  const handleUpdateChapter = () => {};

  return (
    <div className="editor__wrapper">
      {!chapterData ? (
        <div className="container center">
          <h1>Không tìm thấy tập này của truyện.</h1>
        </div>
      ) : (
        <Container fluid>
          <Col>
            <h1 className="text-secondary mb-3">Truyện tên gì vậy</h1>
          </Col>
          <Col className="editor__header d-flex ">
            <Container
              className="editor__thumbnail editor__header--first"
              onClick={() => {
                setVisibleThumbnailSelect(true);
              }}
            >
              <Col sm={12} md={10} lg={8} xl={6}>
                <img
                  src={
                    chapterData && chapterData.thumbnail
                      ? imageHelper.getRawResourceUrl(chapterData.thumbnail)
                      : ServerConfig.DEFAULT_THUMBNAIL
                  }
                  alt="Chỉnh sửa ảnh bìa"
                />
              </Col>
              <Col>
                <small>Nhấn vào ảnh bìa để thay đổi</small>
              </Col>
            </Container>
          </Col>
          <div className="editor__body">
            <Form>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Tiêu đề của tập truyện
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={({ target }) => {
                      setTitle(target.value);
                    }}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="mb-3"
                controlId="formHorizontalEmail"
              >
                <Form.Label column sm={2}>
                  Nội dung
                </Form.Label>
                <Col sm={10}></Col>
              </Form.Group>
            </Form>
          </div>

          <ResourceSelectModal
            visible={visibleThumbnailSelect}
            close={() => {
              setVisibleThumbnailSelect(false);
            }}
            onSelect={handleUpdateChapter}
          />

          {/* 
          
          <BookChapterCreateModal
            visible={isVisibleBookChapterCreate}
            onHide={() => {
              setIsVisibleBookChapterCreate(false);
            }}
            bookId={bookId}
          /> */}
        </Container>
      )}
    </div>
  );
}
