import React, { useEffect, useState } from "react";
import { Pagination, Button, Row, Col, Container } from "react-bootstrap";
import ResourceService from "../../../services/ResourceService";
import "./ResourceManager.scss";
import UploadModal from "./UploadModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faEdit,
  faCheckSquare,
} from "@fortawesome/free-regular-svg-icons";
import RemoveModal from "./RemoveModal";
import ResourceItem from "./ResourceItem";
import { toast } from "react-toastify";
import Loading from "../../Loading/Loading";
import LazyLoad from "react-lazyload";

const PAGE_ITEMS_LIMIT = 12;

function ResourceFooter({ totalSize, setPage, page }) {
  const [totalPages, setTotalPages] = useState(0);
  const [pages, setPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    async function updatePage() {
      if (totalSize) {
        setTotalPages(Math.abs(Math.ceil(totalSize / PAGE_ITEMS_LIMIT)));
        setPages(totalPages > 0 ? totalPages : 1);
        setStartIndex(page - 2);
        setEndIndex(page + 2);
      }
    }
    updatePage();
  }, [totalSize, totalPages, page]);

  const handleClickNext = () => {
    setPage(page + 1 > totalPages ? page : page + 1);
  };

  const handleClickPrevious = () => {
    setPage(page - 1 < 1 ? page : page - 1);
  };

  const handleClickLast = () => {
    setPage(pages);
  };

  const handleClickFirst = () => {
    setPage(1);
  };

  return (
    <Pagination>
      <Pagination.First onClick={handleClickFirst} />
      <Pagination.Prev onClick={handleClickPrevious} />

      {pages > 0 &&
        [...Array(pages)].map((e, i) => {
          const currentPage = i + 1;
          if (startIndex <= i && i <= endIndex) {
            return (
              <Pagination.Item
                key={i}
                active={page === currentPage}
                onClick={() => {
                  setPage(currentPage);
                }}
              >
                {currentPage}
              </Pagination.Item>
            );
          }
          return null;
        })}

      <Pagination.Next onClick={handleClickNext} />
      <Pagination.Last onClick={handleClickLast} />
    </Pagination>
  );
}

export default function ResourceManager() {
  const [selection, setSelection] = useState([]);
  const [data, setData] = useState(null);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const [isRemoveVisible, setRemoveVisible] = useState(false);
  // Page (pagination) utility variables
  const [totalSize, setTotalSize] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  const handleToggleSelect = (value) => {
    // Found index in selection, remove it
    selection.indexOf(value) !== -1
      ? setSelection(selection.filter((e) => e !== value))
      : setSelection([...selection, value]);
  };

  const handleOpenUploadModal = () => {
    setUploadVisible(true);
  };

  const handleCloseUploadModal = () => {
    setUploadVisible(false);
  };

  const handleOpenRemoveModal = () => {
    if (selection.length === 0) {
      return toast.error(`Không có giá trị nào được chọn để xoá.`);
    }
    setRemoveVisible(true);
  };

  const handleCloseRemoveModal = () => {
    setRemoveVisible(false);
  };

  /**
   * Update items
   */
  useEffect(() => {
    setLoading(true);
    const k = (page - 1) * PAGE_ITEMS_LIMIT;
    setStartIndex(k);
    setEndIndex(k + PAGE_ITEMS_LIMIT);
    ResourceService.getAllResources()
      .then((response) => {
        const { data } = response.data;
        setData(data);
      })
      .catch((e) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  useEffect(() => {
    // Selection update
    if (data) {
      setTotalSize(data.length);
    }
  }, [data]);

  const handleSelectAll = () => {
    const selectItems = data.filter(
      (_e, i) => startIndex <= i && i < endIndex && selection.indexOf(_e) === -1
    );
    setSelection([...selection, ...selectItems]);
  };

  return (
    <>
      <div className="resource__wrapper">
        <div className="resource__header">
          <h1 className="title text-dark">Tài nguyên</h1>
          <h3 className="subtitle text-secondary">Quản lý tài nguyên</h3>
        </div>
        <div className="resource__actionbar">
          <Button onClick={handleOpenUploadModal}>Tải lên</Button>
        </div>
        {loading ? (
          <Loading color={`black`} />
        ) : (
          <>
            {data && data.length > 0 ? (
              <>
                {/* selected interact action bar */}
                <Container fluid className="resource__container">
                  {/* {selection.length > 0 && ()} */}
                  <Col className="resourceitem__actionbar actionbar">
                    <div className="actionbar__block--left">
                      <span
                        className="button--actionbar"
                        onClick={handleSelectAll}
                      >
                        <FontAwesomeIcon icon={faCheckSquare} />
                      </span>
                      <span>
                        <b>
                          {selection.length === 0
                            ? "Chưa chọn"
                            : selection.length}
                        </b>
                      </span>
                    </div>
                    <div className="actionbar__block--right">
                      <span className="button--actionbar">
                        <FontAwesomeIcon icon={faEdit} />
                      </span>
                      <span
                        onClick={handleOpenRemoveModal}
                        className="button--actionbar"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </span>
                    </div>
                  </Col>
                  <Row>
                    {data &&
                      data.map((ele, index) => {
                        if (startIndex <= index && index < endIndex) {
                          return (
                           <ResourceItem
                                id={ele}
                                selected={selection.indexOf(ele) !== -1}
                                minimizeThumbnail={true}
                                onSelect={() => {
                                  handleToggleSelect(ele);
                                }}
                              />
                          );
                        }
                        return null;
                      })}
                  </Row>
                </Container>
                {data && !loading ? (
                  <div className="resources__footer">
                    <ResourceFooter
                      totalSize={totalSize}
                      page={page}
                      setPage={setPage}
                    />
                  </div>
                ) : null}
              </>
            ) : (
              <div className="resource__container">
                <h1>
                  Không tìm thấy tài nguyên nào, bạn có thể tải lên tài nguyên
                  mới
                </h1>
              </div>
            )}
          </>
        )}
        {/* Register upload modal */}
        <UploadModal
          show={isUploadVisible}
          onClose={handleCloseUploadModal}
          setData={setData}
          data={data}
        />
        {/* Register remove modal */}
        <RemoveModal
          show={isRemoveVisible}
          onClose={handleCloseRemoveModal}
          selection={selection}
          setSelection={setSelection}
          setData={setData}
          data={data}
        />
      </div>
    </>
  );
}
