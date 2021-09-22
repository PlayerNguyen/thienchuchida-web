import React from 'react'
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
import { Link, useRouteMatch } from "react-router-dom";
import Config from "../../config/server.config";
import Header from "../Header/Header";
import imageHelper from "../../helpers/imageHelper";

export default function BookInformation(bookInfo, chapters) {
  return (
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
                className="thumbnail"
                src={
                  bookInfo && bookInfo.thumbnail
                    ? imageHelper.getRawResourceUrl(bookInfo.thumbnail)
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
                  
                </div>
              </div>
            </div>
          </div>

          <div className="chapterbox__outer">
            <h1 className="title title--large">Danh sách các tập</h1>
            <div className="chapterbox">
              {chapters &&
                chapters.data.map((ele, ind) => {
                  {/* return <Chapter data={ele} key={ind} bookId={bookInfo._id} />; */}
                })}
            </div>
          </div>
        </div>
  )
}
