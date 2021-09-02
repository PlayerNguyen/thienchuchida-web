import React, { useEffect, useState } from "react";
import moment from "moment";
import Config from "../../config/Config";
import BookService from "../../services/BookService";
import "./Home.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClock } from "@fortawesome/free-regular-svg-icons";
import 'moment/locale/vi'
moment.locale("vi");

function CardItem({ data }) {
  
  return (
    <Link className="card" to={`/truyen/${data ? data.slug : null}`}>
      <div className="card__body">
        <div className="card__body__thumbnail">
          <img
            src={
              data.thumbnail
                ? `${Config.SERVER_API_URL}/${data.thumbnail.path}`
                : // Default size url
                  `https://dummyimage.com/200x300/f5f5f5/000&text=Sample+image`
            }
            alt="Thumbnail"
          />
        </div>
      </div>
      <div className="card__footer">
        <div className="card__footer__title">
          {data.title ? data.title : `Untitled`}
        </div>
        <div className="card__footer__information">
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
    <div className="home__wrapper container">
      {/* Header here */}
      <div className="home__content">
        {/* Left block */}
        <div className="home__content--outer">
          {/* Title */}
          <div>
            <h1>
              <Link to="/">Truyện mới</Link>
            </h1>
          </div>
          {/* Item list */}
          <div className="home__item_list cardbox">
            {lastUpdated
              ? lastUpdated.map((ele, index) => {
                  return <CardItem key={index} data={ele && ele} />;
                })
              : null}
          </div>
        </div>

        {/* Aside */}
        <div className="home__content--aside">
          <div>
            <h1>Thông báo</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
