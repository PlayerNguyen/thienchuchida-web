import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Table,
  ButtonGroup,
} from "react-bootstrap";
import TagService from "../../../services/TagService";

export default function BookTagSelector({ tags, visible, close, onComplete }) {
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    // Initialize the tag
    setSelectedTags([...tags]);
  }, [tags]);

  useEffect(() => {
    return () => {
      setSelectedTags([]);
      setSearchData([]);
      setQuery("");
    };
  }, []);

  const handleOnSubmit = (e) => {
    // Prevent default form
    e.preventDefault();
    // Handle search a tag
    handleSearchTag();
  };

  const handleSearchTag = () => {
    if (query !== "") {
      setSearching(true);
      TagService.findTag(query)
        .then((response) => {
          const { data } = response.data;
          // Set a search data field
          setSearchData(data);
        })
        .finally(() => {
          setSearching(false);
        });
    }
  };

  const handleQueryChange = ({ target }) => {
    setQuery(target.value);
  };

  const handleAppendNewTag = (tag) => {
    setSelectedTags([...selectedTags, tag]);
  };
  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((e) => tag._id !== e._id));
  };

  const handleCreateNewTag = () => {
    setCreating(true);
    TagService.createTag(query)
      .then((response) => {
        const { data } = response.data;
        setSearchData([...searchData, data]);
      })
      .finally(() => {
        setCreating(false);
      });
  };

  return (
    <Modal show={visible} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Qu???n l?? th???</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Search header */}
        <Form onSubmit={handleOnSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="query">
            <Col sm={12}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="T??m ki???m th??? c???a b???n"
                  disabled={searching}
                  value={query}
                  onChange={handleQueryChange}
                />
                <Button
                  type="submit"
                  variant="outline-secondary"
                  disabled={searching}
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </InputGroup>
            </Col>
          </Form.Group>
        </Form>

        <div className="d-flex gap-2 flex-wrap">
          {selectedTags &&
            selectedTags.map((tag, index) => {
              return (
                <ButtonGroup key={index}>
                  <Button variant={`outline-dark`}>{tag.name}</Button>
                  <Button
                    variant={`outline-danger`}
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </ButtonGroup>
              );
            })}
        </div>

        {/* Body list */}
        {searching ? (
          <div className="mt-4 text-center">
            <h6>??ang t???i d??? li???u t??m ki???m...</h6>
          </div>
        ) : searchData ? (
          searchData.length > 0 ? (
            <Table responsive borderless hover>
              <thead>
                <tr>
                  <th>T??n th???</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {searchData &&
                  searchData.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <p className="text-dark">{element.name}</p>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            onClick={() => {
                              handleAppendNewTag(element);
                            }}
                            disabled={
                              selectedTags.findIndex(
                                (tag) => tag._id === element._id
                              ) !== -1
                            }
                          >
                            {selectedTags.findIndex(
                              (tag) => tag._id === element._id
                            ) !== -1
                              ? "???? th??m"
                              : `Th??m th???`}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          ) : (
            <div className="container mt-4 text-center">
              <h6>
                Kh??ng t??m th???y th??? v???i t??n {query}.
                <Button
                  variant="link"
                  onClick={handleCreateNewTag}
                  disabled={creating}
                >
                  {creating ? "??ang t???o..." : `Nh???n ????? t???o th???`}
                </Button>
              </h6>
            </div>
          )
        ) : (
          <div className="container mt-4 text-center">
            <h6 className="text-secondary">Nh???p n???i dung ????? t??m ki???m th???</h6>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="primary">T???o th???</Button> */}
        <Button
          variant="success"
          onClick={() => {
            onComplete(selectedTags);
            close();
          }}
        >
          Xong
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
