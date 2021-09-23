import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Container,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { useParams } from "react-router";
import BookService from "../../../services/BookService";
import "./Editor.scss";
import ServerConfig from "../../../config/server.config";
import imageHelper from "../../../helpers/imageHelper";
import ResourceSelectModal from "../ResourceManager/ResourceSelectModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCaretUp,
  faTrashAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import ResourceService from "../../../services/ResourceService";
import toastHelper from "../../../helpers/toastHelper";
import ResourcePreviewModal from "../ResourceManager/ResourcePreviewModal";
import { useHistory, useRouteMatch } from "react-router-dom";
import path from "path";

function ResourceSection({
  id,
  currentIndex,
  maxIndex,
  onRemove,
  onAscend,
  onDecease,
  onPreview,
}) {
  const [data, setData] = useState(null);
  const [originalName, setOriginalName] = useState("");
  useEffect(() => {
    // console.log("id: ", id);
    ResourceService.getResourceMetadata(id).then((response) => {
      const { data } = response.data;
      setData(data);
      setOriginalName(data.originalName);
    });
  }, [id]);

  return (
    <InputGroup className="mb-3">
      <Form.Control type="text" value={originalName} disabled />
      {currentIndex !== 0 && (
        <Button variant="outline-primary" onClick={onAscend}>
          <FontAwesomeIcon icon={faCaretUp} />
        </Button>
      )}
      {currentIndex !== maxIndex - 1 && (
        <Button variant="outline-primary" onClick={onDecease}>
          <FontAwesomeIcon icon={faCaretDown} />
        </Button>
      )}
      <Button
        variant="outline-primary"
        onClick={() => {
          onPreview(data);
        }}
      >
        <FontAwesomeIcon icon={faEye} />
      </Button>
      <Button variant="outline-danger" onClick={onRemove}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
    </InputGroup>
  );
}

export default function BookChapterEditor() {
  const { bookId, chapterId } = useParams();
  const [chapterData, setChapterData] = useState(null);
  const [thumbnailData, setThumbnailData] = useState(null);
  const [visibleThumbnailSelect, setVisibleThumbnailSelect] = useState(false);
  const [title, setTitle] = useState("");
  const [visibleResourceSelect, setVisibleResourceSelect] = useState(false);
  const [resourceSelected, setResourceSelected] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const history = useHistory();
  const { url } = useRouteMatch();

  useEffect(() => {
    setLoading(true);
    BookService.getChapterById(bookId, chapterId)
      .then((response) => {
        const { data } = response.data;
        setChapterData(data);
        setThumbnailData(data.thumbnail);
        setTitle(data.name);
        setResourceSelected(data.content);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookId, chapterId]);

  const handleUpdateThumbnailChapter = (thumbnail) => {
    setSaving(true);
    BookService.updateChapter(chapterId, {
      thumbnail,
    })
      .then((response) => {
        const { message } = response.data;
        toastHelper.success(message);
        setVisibleThumbnailSelect(false);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleOpenResourcePopup = () => {
    setVisibleResourceSelect(true);
  };

  const handleCloseResourcePopup = () => {
    setVisibleResourceSelect(false);
  };

  const handleResourceSelect = (selects) => {
    setResourceSelected([...resourceSelected, ...selects]);

    handleCloseResourcePopup();
  };

  const handleRemoveSelect = (index) => {
    resourceSelected &&
      setResourceSelected(resourceSelected.filter((_e, i) => i !== index));
  };

  const handleAscendSelect = (index) => {
    swapItem(resourceSelected, setResourceSelected, index, index - 1);
  };

  const handleDeceaseSelect = (index) => {
    swapItem(resourceSelected, setResourceSelected, index, index + 1);
  };

  const swapItem = (array, setArrayFunction, index, index1) => {
    let arr = array;

    let c = arr[index];
    arr[index] = arr[index1];
    arr[index1] = c;

    setArrayFunction([...arr]);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    setSaving(true);
    BookService.updateChapter(chapterId, {
      title: title,
      content: resourceSelected,
    })
      .then((response) => {
        const { message } = response.data;
        toastHelper.success(message);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleOnPreview = (resourceData) => {
    setPreviewData(resourceData);
    setVisiblePreview(true);
  };

  const handleOnClosePreview = () => {
    // Hide
    setVisiblePreview(false);
    setTimeout(() => {
      // Clean up
      setPreviewData(null);
    }, 400);
  };

  const handleDeleteChapter = () => {
    BookService.deleteChapter(chapterId).then((response) => {
      const { message } = response.data;
      toastHelper.success(message);
      // Moves backwards
      history.push(path.dirname(url));
    });
  };

  const handleCloseDelete = () => {
    setVisibleDelete(false);
  };

  const handleOpenDeletePopup = () => {
    setVisibleDelete(true);
  };

  return (
    <div className="editor__wrapper">
      {!chapterData ? (
        <div className="container center">
          <h1>
            {loading
              ? `Đang tải dữ liệu...`
              : `Không tìm thấy tập này của truyện.`}
          </h1>
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
                    thumbnailData
                      ? imageHelper.getRawResourceUrl(thumbnailData._id)
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
            <Form onSubmit={handleSubmitForm}>
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
                <Col sm={10}>
                  {resourceSelected.map((e, i) => {
                    return (
                      <ResourceSection
                        currentIndex={i}
                        id={e}
                        key={i}
                        maxIndex={resourceSelected.length}
                        onRemove={() => {
                          handleRemoveSelect(i);
                        }}
                        onAscend={() => {
                          handleAscendSelect(i);
                        }}
                        onDecease={() => {
                          handleDeceaseSelect(i);
                        }}
                        onPreview={handleOnPreview}
                      />
                    );
                  })}
                  <Button variant="success" onClick={handleOpenResourcePopup}>
                    Thêm
                  </Button>
                </Col>
              </Form.Group>
              {/* <Button variant="primary">Xem</Button> */}
              {/* Footer */}
              <div className="d-flex flex-row-reverse gap-2">
                {/* Change save button */}
                <Button type="submit" variant="primary" disabled={saving}>
                  {saving ? `Đang lưu...` : `Lưu thay đổi`}
                </Button>

                {/* Delete button */}
                <Button variant="danger" onClick={handleOpenDeletePopup}>
                  Xoá tập
                </Button>
              </div>
            </Form>
          </div>

          <ResourceSelectModal
            visible={visibleThumbnailSelect}
            close={() => {
              setVisibleThumbnailSelect(false);
            }}
            onSelect={handleUpdateThumbnailChapter}
          />

          <ResourceSelectModal
            multiple
            visible={visibleResourceSelect}
            close={handleCloseResourcePopup}
            onMultipleSelect={handleResourceSelect}
          />
          <ResourcePreviewModal
            data={previewData}
            visible={visiblePreview}
            close={handleOnClosePreview}
          />

          <Modal show={visibleDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
              <Modal.Title>Xoá truyện</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bạn có chắc chắn muốn xoá tập truyện này? Tập truyện này sẽ bị
              mất, tuy nhiên dữ liệu sẽ không bị ảnh hưởng.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseDelete}>
                Huỷ
              </Button>
              <Button variant="danger" onClick={handleDeleteChapter}>
                Xoá
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      )}
    </div>
  );
}