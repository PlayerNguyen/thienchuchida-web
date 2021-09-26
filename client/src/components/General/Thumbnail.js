import React from "react";
import ResourceImage from "../Admin/ResourceManager/ResourceImage";
import "./Thumbnail.scss";


export default function Thumbnail({ id, alt }) {
  return (
    <div className="thumbnail__wrapper">
      <div className="thumbnail__main">
        {/* <img src={src} alt={alt} /> */}
        <ResourceImage id={id} alt={alt} />
      </div>
    </div>
  );
}
