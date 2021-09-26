import React, { useEffect, useState } from "react";

import { Card, Button, Container } from "react-bootstrap";
import BookService from "../../../services/BookService";
import { Link, useRouteMatch } from "react-router-dom";

import BookCreateModal from "./BookCreateModal";
import BookRemoveConfirmModel from "./BookRemoveConfirmModel";
import ResourceImage from "../ResourceManager/ResourceImage";
import "./Selector.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";


export default function BookSelector() {
  const [books, setBooks] = useState(null);

  const [visibleCreateModal, setVisibleCreateModal] = useState(false);
  const [visibleRemoveModal, setVisibleRemoveModal] = useState(false);
  const [removeTarget, setRemoveTarget] = useState(null);

  // const [page, setPage] = useState(0);
  const { path } = useRouteMatch();

  useEffect(() => {
    BookService.getAllBooks().then((response) => {
      const { data } = response.data;
      // Set book data to state
      setBooks(data);
    });
  }, []);

  const handleOnRemove = (id) => {
    // Remove renderer
    setBooks(books.filter((e) => e._id !== id));
  };

  const handleRemoveConfirmation = (targetId) => {
    console.log(targetId);
    setRemoveTarget(targetId);
    setVisibleRemoveModal(true);
  };

  const handleCloseRemoveModal = () => {
    setVisibleRemoveModal(false);
  };

  return (
    <div>
      {/* Action bar */}
      <div className="mb-2 mt-2">
        <Button
          onClick={() => {
            // Show create modal
            setVisibleCreateModal(true);
          }}
        >
          Tạo truyện mới
        </Button>
      </div>
      <div
        className="selector d-flex flex-row flex-wrap flex-wrap"
        id="book-selector"
      >
        {books ? (
          books.length > 0 ? (
            books.map((e, i) => {
              return (
                <Card className="item" key={e._id}>
                  {/* <Card.Img
                    variant="top"
                    className="thumbnail"
                    src={
                      e.thumbnail
                        ? imageHelper.getRawResourceUrl(e.thumbnail)
                        : ServerConfig.DEFAULT_THUMBNAIL
                    }
                  /> */}
                  <ResourceImage id={e.thumbnail} />
                  <Card.Body>
                    <Card.Title>{e.title}</Card.Title>
                    <Card.Text>{e.description}</Card.Text>
                    {/* Information */}

                  </Card.Body>
                  <Card.Footer>
                    <Button variant={`link`}>
                      <Link to={`${path}/${e._id}`}>Sửa</Link>
                    </Button>
                    <Button
                      variant={`link`}
                      className="link-danger"
                      onClick={() => handleRemoveConfirmation(e._id)}
                    >
                      Xoá
                    </Button>
                  </Card.Footer>
                </Card>
              );
            })
          ) : (
            <Container fluid>
              <h1 className="text-center pt-5 pb-5">
                Trông ở đây có vẻ trống trải, hãy tạo truyện mới.
              </h1>
            </Container>
          )
        ) : null}
      </div>
      <BookCreateModal
        visible={visibleCreateModal}
        onHide={() => {
          setVisibleCreateModal(false);
        }}
      />

      <BookRemoveConfirmModel
        visible={visibleRemoveModal}
        onRemove={handleOnRemove}
        close={handleCloseRemoveModal}
        id={removeTarget}
      />
    </div>
  );
}
