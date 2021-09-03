import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import BookService from "../../services/BookService";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import "./Book.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock, faHeart } from "@fortawesome/free-regular-svg-icons";

export default function Book() {
  const [bookInfo, setBookInfo] = useState(null);
  const { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    BookService.getBookBySlug(slug).then(({ data }) => {
      const book = data.data[0];
      if (!book) {
        history.push("/");
      }
      // Set a book info
      setBookInfo(data.data[0]);
    });
  }, [slug, history]);

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
            <img
              src="https://dummyimage.com/1920x1080/f5f5f5/000&text=Sample+image"
              alt="thumbnail"
            />
          </div>
          {/* Info box in right */}
          <div className="book__infobox">
            <h1 className="book__title">{bookInfo && bookInfo.title}</h1>
            <p className="book__description">
              {bookInfo && bookInfo.description}
            </p>
            <div className="book__status">
              <div>
                <span>
                  <FontAwesomeIcon icon={faEye} />
                </span>
                <span>Lượt xem</span>
                <span className="bold">120.356.156</span>
              </div>

              <div>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                </span>
                <span>Cập nhật</span>
                <span className="bold">2 giờ trước</span>
              </div>
              <div>
                <span>
                  <FontAwesomeIcon icon={faHeart} />
                </span>
                <span>Yêu thích</span>
                <span className="bold">150.303</span>
              </div>
            </div>
          </div>
        </div>

        {/* <hr /> */}

        <div class="chapterbox__outer">
          <h1 className="title">
            Danh sách các tập
          </h1>
          <div className="chapterbox">
            <div className="chapter">
              <div className="chapter__thumbnail">
                <img
                  src="https://dummyimage.com/1920x1080/f5f5f5/000&text=Sample+image"
                  alt="thumbnail chapter s"
                />
              </div>
              <div className="chapter__footer">
                <div className="chapter__title title">Chapter 2</div>
              </div>
            </div>
            <div className="chapter">
              <div className="chapter__thumbnail">
                <img
                  src="https://dummyimage.com/1920x1080/f5f5f5/000&text=Sample+image"
                  alt="thumbnail chapter s"
                />
              </div>
              <div className="chapter__footer">
                <div className="chapter__title title">Chapter 2</div>
              </div>
            </div>
            <div className="chapter">
              <div className="chapter__thumbnail">
                <img
                  src="https://dummyimage.com/1920x1080/f5f5f5/000&text=Sample+image"
                  alt="thumbnail chapter s"
                />
              </div>
              <div className="chapter__footer">
                <div className="chapter__title title">Chapter 2</div>
              </div>
            </div>
            <div className="chapter">
              <div className="chapter__thumbnail">
                <img
                  src="https://dummyimage.com/1920x1080/f5f5f5/000&text=Sample+image"
                  alt="thumbnail chapter s"
                />
              </div>
              <div className="chapter__footer">
                <div className="chapter__title title">Chapter 2</div>
              </div>
            </div>
            <div className="chapter">
              <div className="chapter__thumbnail">
                <img
                  src="https://dummyimage.com/1920x1080/f5f5f5/000&text=Sample+image"
                  alt="thumbnail chapter s"
                />
              </div>
              <div className="chapter__footer">
                <div className="chapter__title title">Chapter 2</div>
              </div>
            </div>
            <div className="chapter">
              <div className="chapter__thumbnail">
                <img
                  src="https://dummyimage.com/1920x1080/f5f5f5/000&text=Sample+image"
                  alt="thumbnail chapter s"
                />
              </div>
              <div className="chapter__footer">
                <div className="chapter__title title">Chapter 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
