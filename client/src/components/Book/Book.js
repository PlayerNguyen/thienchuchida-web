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
import Config from "../../config/server.config";
import Header from '../Header/Header'

function Chapter({data, bookId}) {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    BookService.getChapterById(bookId, data._id).then(response => {
      console.log()
    })
  }, [data, bookId])
  return (
    <div className="chapter">
      <div className="chapter__thumbnail">
        <img src={Config.DEFAULT_THUMBNAIL} alt="thumbnail chapter s" />
      </div>
      <div className="chapter__footer">
        <div className="chapter__title title">{data && data.name}</div>
        <div className="chapter__views">
          <span>Views:</span>
          <span>{data && data.views}</span>
        </div>
      </div>
    </div>
  );
}

export default function Book() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookInfo, setBookInfo] = useState(null);
  const [chapters, setChapters] = useState(null);
  const { slug } = useParams();
  const history = useHistory();

  useEffect(() => {
    BookService.getBookBySlug(slug)
      .then(({ data }) => {
        const book = data.data;
        if (!book) {
          history.push("/");
        }
        // Set a book info
        setBookInfo(book);
        setChapters(data.chapters);
      })
      .finally(() => {
        // Set loading to false to render
        setIsLoading(false);
      });
  }, [slug, history]);

  return (
    <div className="book__wrapper">
      <Header />
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
                src={
                  bookInfo
                    ? `${Config.SERVER_API_URL}/${bookInfo.thumbnail.path}`
                    : Config.DEFAULT_THUMBNAIL
                }
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
            {chapters && chapters.data.map((ele, ind) => {
                return <Chapter data={ele} key={ind} bookId={bookInfo._id} />
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
