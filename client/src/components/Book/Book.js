import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import BookService from "../../services/BookService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Book.scss";

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
          <Breadcrumb
            data={[
              { url: "/", value: "Trang chủ" },
              {
                url: `/truyen/${bookInfo && bookInfo.slug}`,
                value: `${bookInfo && bookInfo.title}`,
              },
            ]}
          />
        </div>
        <div className="book__body">
            {/* Big thumbnail in left */}
          <div className="book__thumbnail">
            <img src="https://dummyimage.com/200x300/f5f5f5/000&text=Sample+image" alt="thumbnail" />
          </div>
          {/* Info box in right */}
          <div className="book__infobox">
            <h1 className="book__title">
              {bookInfo && bookInfo.title}
            </h1>
            <p className="book__description">
              {bookInfo && bookInfo.description}
            </p>
            <div>
              views: 1k
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
