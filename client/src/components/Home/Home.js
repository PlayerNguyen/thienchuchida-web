import React, { useEffect, useState } from "react";
import Config from "../../config/server.config";
import BookService from "../../services/BookService";
import "./Home.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock } from "@fortawesome/free-regular-svg-icons";
import "moment/locale/vi";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import moment from '../../helpers/momentHelper'
import Header from '../Header/Header'
import imageHelper from "../../helpers/imageHelper";

function CardItem({ data }) {
  return (
    <Link className="bookcard" to={`/truyen/${data ? data.slug : null}`}>
      <div className="bookcard__body">
        <div className="bookcard__body__thumbnail">
          <img
            src={
              data.thumbnail
                ? imageHelper.getRawResourceUrl(data.thumbnail)
                : // Default size url
                  Config.DEFAULT_THUMBNAIL
            }
            alt="Thumbnail"
          />
        </div>
      </div>
      <div className="bookcard__footer">
        <div className="bookcard__footer__title">
          {data.title ? data.title : `Untitled`}
        </div>
        <div className="bookcard__footer__information">
          <div>
            <span>
              <FontAwesomeIcon icon={faEye} />
            </span>
            <span>{data && data.views}</span>
          </div>
          <div>
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>
            <span>
              {data && moment(new Date(data.updatedAt)).fromNow(true)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    BookService.getLatestUpdateBook(4, 1).then(({ data }) => {
      setLastUpdated(data.data);
    });
  }, []);

  return (
    <div className="home__wrapper">
      <div className="home__header">
        <Header />
      </div>
      {/* Header here */}
      <div className="home__content">
        {/* Left block */}
        <div className="category__box">
          <div className="category">
            <div className="category__title">
              <Link to="/truyen-moi-cap-nhat" className="link link--primary">
                <span>Truyện mới cập nhật</span>
                <span className="text text--secondary nav__icon">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </Link>
            </div>
            <div className="category__content cardbox">
              {lastUpdated
                ? lastUpdated.map((ele, index) => {
                    return <CardItem key={index} data={ele && ele} />;
                  })
                : null}
            </div>
          </div>
          <div className="category">
            <div className="category__title">
              <Link to="/" className="link link--primary">
                <span>Truyện mới đăng</span>
                <span className="text text--secondary nav__icon">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </Link>
            </div>
            <div className="category__content cardbox">
              {lastUpdated
                ? lastUpdated.map((ele, index) => {
                    return <CardItem key={index} data={ele && ele} />;
                  })
                : null}
            </div>
          </div>
          <div className="category">
            <div className="category__title">
              <Link to="/" className="link link--primary">
                <span>Truyện mới</span>
                <span className="text text--secondary nav__icon">
                  <FontAwesomeIcon icon={faChevronRight} />
                </span>
              </Link>
            </div>
            <div className="category__content cardbox">
              {lastUpdated
                ? lastUpdated.map((ele, index) => {
                    return <CardItem key={index} data={ele && ele} />;
                  })
                : null}
            </div>
          </div>
        </div>

        {/* Aside */}
        <div className="aside__box">
          <div>
            <h1>Thông báo</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
