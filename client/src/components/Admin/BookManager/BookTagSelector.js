import React, { useEffect, useState } from "react";
import { Dropdown, Form, FormGroup } from "react-bootstrap";
import BookService from "../../../services/BookService";

export default function BookTagSelector({ show }) {
  const [queryTags, setQueryTags] = useState(null);
  const [searchText, setSearchText] = useState("");

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

  return (
    <div className="selector">
      <Dropdown.Menu show={show} className="p-3">
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
              return <Dropdown.Item key={i}>{e.name}</Dropdown.Item>;
            })
          ) : (
            <Dropdown.Item>
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
