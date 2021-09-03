import React from "react";
import "./Breadcrumb.scss";
import { Link } from "react-router-dom";

export default function Breadcrumb({ data }) {
  return (
    <div className="breadcrumb__wrapper">
      <div className="breadcrumb">
        <div className="breadcrumb__container">
          {data &&
            data.map((element, index) => {
              const representClass =
                index < data.length - 1
                  ? `link link--secondary`
                  : `link link--secondary link--active bold`;
              return (
                <div key={index}>
                  <Link className={representClass} to={element && element.url} >
                    {element && element.value}
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
