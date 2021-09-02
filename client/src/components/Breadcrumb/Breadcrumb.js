import React from "react";
import "./Breadcrumb.scss";
import { Link } from "react-router-dom";

export default function Breadcrumb({ data }) {
  return (
    <div className="breadcrumb__wrapper">
      <div className="breadcrumb">
        <div className="breadcrumb__container">
          <div>
            <Link className="link link--secondary" to='/'>Trang chủ</Link>
          </div>
          <div>
            <Link className="link link--secondary" to='/truyen'>Trang chủ</Link>
          </div>
          <div>
            <Link className="link link--secondary link--active bold" to='/'>Trang chủ</Link>
          </div>

          
        </div>
      </div>
    </div>
  );
}
