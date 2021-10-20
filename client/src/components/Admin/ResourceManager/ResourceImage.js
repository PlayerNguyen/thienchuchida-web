import React, { useEffect, useState } from "react";
import axiosInstance from "../../../helpers/axiosInstance";
import imageHelper from "../../../helpers/imageHelper";
import Loading from "../../Loading/Loading";
import "./ResourceItem.scss";
import ServerConfig from "../../../config/server.config";

export default function ResourceImage({ id, alt, height, ...children }) {
  // const [contentType, setContentType] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (id) {
  //     // Set loading an image to true
  //     setLoading(false);

  //     // Then load it
  //     axiosInstance
  //       .get(imageHelper.getBase64ResourceUrl(id))
  //       .then((response) => {
  //         const { headers } = response;
  //         setContentType(headers["content-type"]);
  //         setData(response.data);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }

  //   // Clean up the component
  //   return () => {
  //     setLoading(false)
  //     setContentType(null)
  //     setLoading(false)
  //   };
  // }, [id]);

  return (
    // <div className="w-100" {...children}>
    //   {loading ? (
    //     <Loading />
    //   ) : id ? (
    //     data ? (
    //       <img
    //         src={`data:${imageHelper.getBase64ResourceUrl(id)};base64, ${imageHelper.getBase64ResourceUrl(id)}`}
    //         alt={alt || ``}
    //         className="w-100 img--resource"
    //         style={{ maxHeight: height }}
    //       />
    //     ) : (
    //       <div className="text-danger text-center p-5">Ảnh không hợp lệ.</div>
    //     )
    //   ) : (
    //     <img
    //         src={ServerConfig.DEFAULT_THUMBNAIL}
    //         alt={alt || ``}
    //         className="w-100 img--resource"
    //         style={{ maxHeight: height }}
    //       />
    //   )}
    // </div>
    <img
      src={imageHelper.getRawResourceUrl(id)}
      alt={alt || ``}
      className="w-100 img--resource"
      style={{ maxHeight: height }}
    />
  );
}
