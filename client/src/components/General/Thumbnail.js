import React from "react";
import "./Thumbnail.scss";

export default function Thumbnail({ src, alt }) {
  return (
    <div className="thumbnail__wrapper">
      <div className="thumbnail__main">
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}
