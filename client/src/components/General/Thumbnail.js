import React from "react";
import ResourceImage from "../Admin/ResourceManager/ResourceImage";
import "./Thumbnail.scss";


export default function Thumbnail({ id, alt, height }) {
  return (
    <div className="thumbnail__wrapper">
      <div className="thumbnail__main">
        {/* <img src={src} alt={alt} /> */}
        <ResourceImage id={id} alt={alt} height={height} />
      </div>
    </div>
  );
}
