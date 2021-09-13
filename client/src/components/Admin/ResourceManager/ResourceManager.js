import React, { useEffect, useState } from "react";
import { Pagination, Button } from "react-bootstrap";
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
  /**
   * Select variables
   */
  const [selection, setSelection] = useState([]);
  const [isUploadVisible, setUploadVisible] = useState(false);
  const [isRemoveVisible, setRemoveVisible] = useState(false);
  const [data, setData] = useState(null);
  const [totalSize, setTotalSize] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="resource__wrapper">
      <div className="resource__header">
        <h1 className="title text-dark">Tài nguyên</h1>
        <h3 className="subtitle text-secondary">Quản lý tài nguyên</h3>
      </div>
      <div className="resource__actionbar">
        <Button onClick={handleOpenUploadModal}>Tải lên</Button>
      </div>
      {data && data.length > 0 ? (
        <>
          <div className="resource__container">
            {selection.length > 0 && (
              <div className="resourceitem__actionbar actionbar">
                <div className="actionbar__block--left">
                  <span>
                    <FontAwesomeIcon icon={faCheckSquare} />
                  </span>
                  <span>
                    <b>{selection.length}</b>
                  </span>
                </div>
                <div className="actionbar__block--right">
                  <span>
                    <FontAwesomeIcon icon={faEdit} />
                  </span>
                  <span onClick={handleOpenRemoveModal}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                </div>
              </div>
            )}
            <div className="resourceitem__wrapper">
              {data
                ? data.map((ele, index) => {
                    const start = (page - 1) * PAGE_ITEMS_LIMIT;
                    const end = start + PAGE_ITEMS_LIMIT;
                    if (start <= index && index < end) {
                      return (
                        <ResourceItem
                          id={ele}
                          selected={selection.indexOf(ele) !== -1}
                          key={index}
                          onClick={() => {
                            handleToggleSelect(ele);
                          }}
                        />
                      );
                    }
                    return null;
                  })
                : null}
            </div>
          </div>
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
            Không tìm thấy tài nguyên nào, bạn có thể tải lên tài nguyên mới
          </h1>
        </div>
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
  );
}
