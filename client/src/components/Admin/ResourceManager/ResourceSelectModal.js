import React, { useState, useEffect } from "react";
import { Modal, Form, Pagination, Button } from "react-bootstrap";
import "./ResourceSelectModal.scss";
import ResourceItem from "./ResourceItem";
import ResourceService from "../../../services/ResourceService";

const DATA_OFFSET = 6;
const PAGE_RANGE_OFFSET = 2;

export default function ResourceSelectModal({
  visible,
  close,
  onSelect,
  title,
  multiple,
  onMultipleSelect,
}) {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(1);

  const [startIndexPage, setStartIndexPage] = useState(1);
  const [endIndexPage, setEndIndexPage] = useState(1);

  const [searchValue, setSearchValue] = useState("");
  const [recentSearchValue, setRecentSearchValue] = useState("");
  const [searching, setSearching] = useState(false);

  const [selectValues, setSelectValues] = useState([]);

  useEffect(() => {
    const k = (page - 1) * DATA_OFFSET;
    setStartIndex(k);
    setEndIndex(k + DATA_OFFSET-1);
    
    // Index of pagination
    setStartIndexPage(page - PAGE_RANGE_OFFSET);
    setEndIndexPage(page + PAGE_RANGE_OFFSET);
  }, [page]);

  useEffect(() => {
    if (!visible) {
      return handleCleanup();
    }
    ResourceService.getAllResources().then((response) => {
      const { data } = response.data;
      setData(data);
    });
  }, [visible]);

  useEffect(() => {
    if (data != null) {
      const dataLength = data.length;
      setTotalPage(Math.floor(dataLength / DATA_OFFSET));
    }
  }, [data]);

  const handleSelectResource = (e) => {
    if (!multiple) {
      onSelect && onSelect(e);
    } else {
      setSelectValues(
        selectValues.indexOf(e) !== -1
          ? selectValues.filter((e1) => e1 !== e)
          : [...selectValues, e]
      );
    }
  };

  const handleExtendLeftPageRange = () => {
    const predictPageEndIndex = endIndexPage + PAGE_RANGE_OFFSET;
    setEndIndexPage(
      predictPageEndIndex >= totalPage ? totalPage : predictPageEndIndex
    );
  };

  const handleExtendRightPageRange = () => {
    const predictPageStartIndex = startIndexPage - PAGE_RANGE_OFFSET;
    setStartIndexPage(
      predictPageStartIndex > 0 ? totalPage : predictPageStartIndex
    );
  };

  const handlePrev = () => {
    const prediction = page - 1;
    setPage(prediction > 0 ? prediction : 1);
  };

  const handleNext = () => {
    const prediction = page + 1;
    setPage(prediction >= totalPage ? totalPage : prediction);
  };

  const handleSearchResource = (e) => {
    e.preventDefault();
    if (!searching && recentSearchValue !== searchValue) {
      searchWithValue();
    }
  };

  const handleSearchValueEdit = ({ target }) => {
    setSearchValue(target.value);
  };

  const searchWithValue = () => {
    setSearching(true);
    ResourceService.searchResourceByName(searchValue)
      .then((response) => {
        const { data } = response.data;
        // console.log(data);
        setData(data);
      })
      .finally(() => {
        setSearching(false);
        setRecentSearchValue(searchValue);
        setPage(1);
      });
  };

  const handleSelectAll = () => {
    if (data) {
      // data.forEach((e, i) => {
      //   if (startIndex <= i && i <= endIndex) {
      //     // console.log(e);
      //     setSelectValues([...selectValues, e]);
      //   }
      // });
      Promise.all(data.filter((_, i) => startIndex <= i && i <= endIndex)).then(
        (values) => {
          // console.log("values ", values);
          setSelectValues([...selectValues, ...values])
        }
      );
    }
  };
  useEffect(() => {
    console.log("selectValues ", selectValues);
  }, [selectValues])

  const handleCleanup = () => {
    setData([]);
    setSelectValues([]);
    setSearchValue("");
    setRecentSearchValue("");
    setTotalPage(1);
  };

  return (
    <Modal
      show={visible}
      fullscreen={true}
      onHide={close}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title ? title : `Chọn tài nguyên`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        <Form className="mb-5" onSubmit={handleSearchResource}>
          <Form.Control
            type="text"
            value={searchValue}
            onChange={handleSearchValueEdit}
            placeholder={`Tìm kiếm tên ảnh, ...`}
          />
        </Form>
        <div className="d-flex flex-wrap ">
          {data &&
            data.map((e, i) => {
              if (startIndex <= i && i <= endIndex) {
                return (
                  <ResourceItem
                    key={i}
                    id={e}
                    // disableInfo
                    // onClick={handleSelectResource}
                    selected={multiple && selectValues.indexOf(e) !== -1}
                    minimizeThumbnail={true}
                    onSelect={() => {
                      handleSelectResource(e);
                    }}
                  />
                );
              }
              return null;
            })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {multiple && (
          <span className="text-secondary">Đã chọn {selectValues.length} </span>
        )}

        {data && (
          <Pagination>
            <Pagination.Prev onClick={handlePrev}></Pagination.Prev>
            {startIndexPage > 0 && (
              <Pagination.Ellipsis onClick={handleExtendRightPageRange} />
            )}
            {[...Array(totalPage)].map((e, i) => {
              if (startIndexPage <= i && i <= endIndexPage) {
                return (
                  <Pagination.Item
                    key={i}
                    active={i + 1 === page}
                    onClick={() => {
                      setPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </Pagination.Item>
                );
              }
              return null;
            })}
            {endIndexPage < totalPage - 1 && (
              <Pagination.Ellipsis onClick={handleExtendLeftPageRange} />
            )}
            <Pagination.Next onClick={handleNext}></Pagination.Next>
          </Pagination>
        )}

        {multiple && (
          <>
            <Button onClick={handleSelectAll}>Chọn cả trang</Button>
            <Button
              onClick={() => {
                onMultipleSelect && onMultipleSelect(selectValues);
                // Then clean up
              }}
            >
              Chọn
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
}
