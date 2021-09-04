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
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Book() {
  const [isLoading, setIsLoading] = useState(true);
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
      // Set loading to false to render
      setIsLoading(false);
    });
  }, [slug, history]);

  return (
    <div className="book__wrapper container">
      {isLoading ? (
        <></>
      ) : (
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
              <h1 className="book__title title title--medium">
                {bookInfo && bookInfo.title}
              </h1>
              <p className="book__description">
                {bookInfo && bookInfo.description}
              </p>
              <div className="book__status">
                <div>
                  <span>
                    <FontAwesomeIcon icon={faEye} />
                  </span>
                  <span className="bold">Tác giả</span>
                  <span>Tác giả</span>
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
                <div className="book__tags">
                  <span>
                    <FontAwesomeIcon icon={faTag} />
                  </span>
                  <div>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        to lớn
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        nhỏ bé
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        có nhiều nếp nhăn
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        mập
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                    <span className="badge">
                      <Link className="link link--primary" to="/">
                        thẻ 1
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <hr /> */}

          <div className="chapterbox__outer">
            <h1 className="title title--large">Danh sách các tập</h1>
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
      )}
    </div>
  );
}
