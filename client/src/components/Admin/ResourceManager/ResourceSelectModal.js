import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Pagination,
  Button,
  Container,
  Row,
} from "react-bootstrap";
import "./ResourceSelectModal.scss";
import ResourceItem from "./ResourceItem";
import ResourceService from "../../../services/ResourceService";
import UploadModal from "./UploadModal";

const DATA_OFFSET = 8;
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

  const [isUploadVisible, setIsUploadVisible] = useState(false);

  useEffect(() => {
    const k = (page - 1) * DATA_OFFSET;
    setStartIndex(k);
    setEndIndex(k + DATA_OFFSET - 1);

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
      setTotalPage(Math.ceil(dataLength / DATA_OFFSET));
    }
  }, [data]);

  const handleSelectResource = (e) => {
    if (!multiple) {
      onSelect && onSelect(e);
    } else {
      // console.log("cursor: ", e);
      // Whether not selected resource, remove. Otherwise add into the selectValues
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
      Promise.all(data.filter((_, i) => startIndex <= i && i <= endIndex)).then(
        (values) => {
          const appendValue = [...values].filter(
            (value) => selectValues.indexOf(value) === -1
          );
          setSelectValues([...selectValues, ...appendValue]);
        }
      );
    }
  };

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
          {title ? title : `Ch???n t??i nguy??n`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="container">
        <Form className="mb-3" onSubmit={handleSearchResource}>
          <Form.Control
            type="text"
            value={searchValue}
            onChange={handleSearchValueEdit}
            placeholder={`T??m ki???m t??n ???nh, ...`}
          />
        </Form>
        <Container fluid>
          {/* <Row className="mb-3">
            <Col xs={12} className="text-muted">
              <p>B??? l???c</p>
            </Col>
            <Col>
              <Button>M???i t???i l??n</Button>
            </Col>
          </Row> */}
          <Row>
            {data &&
              data.map((e, i) => {
                if (startIndex <= i && i <= endIndex) {
                  return (
                    <ResourceItem
                      key={i}
                      id={e}
                      selected={multiple && selectValues.indexOf(e) !== -1}
                      minimizeThumbnail={true}
                      onSelect={(_) => {
                        handleSelectResource(e);
                      }}
                    />
                  );
                }
                return null;
              })}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            setIsUploadVisible(true);
          }}
        >
          T???i l??n
        </Button>
        {multiple && (
          <span className="text-secondary">???? ch???n {selectValues.length} </span>
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
            <Button onClick={handleSelectAll}>Ch???n c??? trang</Button>
            <Button
              onClick={() => {
                onMultipleSelect && onMultipleSelect(selectValues);
              }}
            >
              Ch???n
            </Button>
          </>
        )}
      </Modal.Footer>
      {/* Register upload modal */}
      <UploadModal
        show={isUploadVisible}
        // Item was uploaded successfully
        setData={(_) => {
          // Set the data to data state
          setData([..._, ...data]);
          // Close the upload models
          setIsUploadVisible(false);
        }}
        data={data}
        onClose={(_) => setIsUploadVisible(false)}
      />
    </Modal>
  );
}
