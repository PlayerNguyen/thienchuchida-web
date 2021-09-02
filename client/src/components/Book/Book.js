import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import BookService from "../../services/BookService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Book.scss"

export default function Book() {
  const [bookInfo, setBookInfo] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    BookService.getBookBySlug(slug).then(({ data }) => {
      // Set a book info
      setBookInfo(data.data[0]);
    });
  }, [slug]);

  return (
    <div className="book__wrapper container">
      <div className="book">
        <div className="book__header">
          <Breadcrumb />
        </div>
      </div>
    </div>
  );
}
