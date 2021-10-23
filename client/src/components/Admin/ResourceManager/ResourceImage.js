import React, { useEffect, useState } from "react";
import "./ResourceItem.scss";
import LazyLoad from "react-lazyload";
import ImageHelper from "../../../helpers/imageHelper";
// import Loading from "../../Loading/Loading";
// import { Link } from "react-router-dom";
// import ServerConfig from "../../../config/server.config";
// import ResourceService from "../../../services/ResourceService";

export default function ResourceImage({
  id,
  alt,
  height,
  offsetHeight,
  ...children
}) {
  return (
    <LazyLoad
      offset={offsetHeight || 30}
      height={height || 500}
      className="w-100"
      {...children}
    >
      <img
        src={
          // `data:${contentType};base64, ${data}`
          // `${ServerConfig.DEFAULT_THUMBNAIL}/${metadata && metadata.width}x${metadata && metadata.height}/transparent/fff`
          ImageHelper.getRawResourceUrl(id)
        }
        alt={alt || ``}
        className="w-100 img--resource"
        style={{ maxHeight: height }}
      />
    </LazyLoad>
  );
}
