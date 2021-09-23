import React, { useState, useRef } from "react";
import { Dropdown, Form } from "react-bootstrap";
import BookService from "../../../services/BookService";
import useClickOutsideRef from "../../../hooks/useClickOutsideRef";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import TagService from "../../../services/TagService";

export default function BookTagSelector({ show, onSelect, onVisible }) {
  const [queryTags, setQueryTags] = useState(null);
  const [searchText, setSearchText] = useState("");
  const selector = useRef(null);

  const handleSearchTextEditChange = (e) => {
    setSearchText(e.target.value);
  };

  const searchTag = () => {
    BookService.findTagByName(searchText).then((response) => {
      const { data } = response.data;
      setQueryTags(data);
    });
  };

  const handleOnSearchEnterKeyboard = (e) => {
    if (e.keyCode === 13) {
      searchTag();
    }
  };

  const handleCreateAndAddTag = () => {
    TagService.createTag(searchText).then((response) => {
      console.log(response);
    });
  };

  /**
   * Close on click outside
   */
  useClickOutsideRef(selector, onVisible);

  return (
    <div className="selector" ref={selector}>
      <Dropdown.Menu show={show} className="p-3 d-f">
        {/* Search bar */}
        <Form.Group>
          <Form.Control
            type="text"
            onChange={handleSearchTextEditChange}
            onKeyDown={handleOnSearchEnterKeyboard}
            placeholder={`Tìm thẻ của bạn`}
          />
        </Form.Group>
        {/* Body to select tags */}
        <Dropdown.Header>Tìm kiếm từ khoá</Dropdown.Header>
        {queryTags && searchText !== "" ? (
          queryTags.length !== 0 ? (
            queryTags.map((e, i) => {
              return (
                <Dropdown.Item
                  key={i}
                  as="button"
                  onClick={() => {
                    onSelect(e);
                  }}
                >
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span>{e.name}</span>
                </Dropdown.Item>
              );
            })
          ) : (
            <Dropdown.Item onClick={handleCreateAndAddTag}>
              Thêm thẻ <b>{searchText}</b>
            </Dropdown.Item>
          )
        ) : (
          <Dropdown.Item disabled>Nhập từ khoá để tìm kiếm</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </div>
  );
}
