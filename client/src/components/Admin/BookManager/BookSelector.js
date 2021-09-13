import React, { useEffect, useState } from "react";

import { Card, Button } from "react-bootstrap";
import ServerConfig from "../../../config/server.config";
import BookService from "../../../services/BookService";
import { Link, useRouteMatch } from "react-router-dom";

import "./Selector.scss"  

export default function BookSelector({ setCurrentBook }) {
  const [books, setBooks] = useState(null);
  // const [page, setPage] = useState(0);
  const {path} = useRouteMatch()

  useEffect(() => {
    BookService.getAllBooks().then((response) => {
      const { data } = response.data;
      // Set book data to state
      setBooks(data);
    });
  }, []);

  return (
    <div className="selector d-flex flex-row flex-wrap flex-wrap" id="book-selector">
      {books &&
        books.map((e, i) => {
          return (
            <Card className="item" key={e._id}>
              <Card.Img
                variant="top"
                src={e.thumbnail ? e.thumbnail : ServerConfig.DEFAULT_THUMBNAIL}
              />
              <Card.Body>
                <Card.Title>{e.title}</Card.Title>
                <Card.Text>{e.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  variant={`link`}
                >
                  <Link to={`${path}/${e._id}`}>Sửa</Link>
                </Button>
                <Button variant={`link`} className="link-danger">
                  Xoá
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
    </div>
  );
}
