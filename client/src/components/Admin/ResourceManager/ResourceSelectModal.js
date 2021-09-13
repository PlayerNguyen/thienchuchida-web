import React, { useState, useEffect } from "react";
import { Modal, Form, Pagination } from "react-bootstrap";
import "./ResourceSelectModal.scss";
import ResourceItem from "./ResourceItem";
import ResourceService from "../../../services/ResourceService";

const DATA_OFFSET = 5;
const PAGE_RANGE_OFFSET = 2;

export default function ResourceSelectModal({ visible, close, onSelect }) {
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

  useEffect(() => {
    const k = (page - 1) * DATA_OFFSET;
    setStartIndex(k);
    setEndIndex(k + DATA_OFFSET);

    // Index of pagination
    setStartIndexPage(page - PAGE_RANGE_OFFSET);
    setEndIndexPage(page + PAGE_RANGE_OFFSET);
  }, [page]);

  useEffect(() => {
    ResourceService.getAllResources().then((response) => {
      const { data } = response.data;
      setData(data);
    });
  }, []);

  useEffect(() => {
    if (data != null) {
      const dataLength = data.length;
      setTotalPage(Math.floor(dataLength / DATA_OFFSET));
    }
  }, [data]);

  const handleSelectResource = (e) => {
    onSelect && onSelect(e)
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
        console.log(data);
        setData(data);
      })
      .finally(() => {
        setSearching(false);
        setRecentSearchValue(searchValue);
        setPage(1);
      });
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
          Chọn tài nguyên
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
                    minimizeThumbnail={true}
                    onSelect={() => {handleSelectResource(e)}}
                  />
                );
              }
              return null;
            })}
        </div>
      </Modal.Body>
      <Modal.Footer>
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
        {/* <Button>Chọn</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
