import React, { useEffect, useState } from "react";
import axiosInstance from "../../../helpers/axiosInstance";
import imageHelper from "../../../helpers/imageHelper";
import Loading from "../../Loading/Loading";
import "./ResourceItem.scss";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";

export default function ResourceImage({ id, alt, height, ...children }) {
  const [contentType, setContentType] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPrivate, setPrivate] = useState(false);

  useEffect(() => {
    if (id) {
      // Set loading an image to true
      setLoading(false);

      // Then load it
      axiosInstance
        .get(imageHelper.getBase64ResourceUrl(id))
        .then((response) => {
          const { headers } = response;
          setContentType(headers["content-type"]);
          setData(response.data);
          console.log(response);
        })
        .catch((error) => {
          // console.log()
          setPrivate(error.response.data.error.name === "TokenNotFoundError");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // Clean up the component
    return () => {
      // setLoading(false);
      setContentType(null);
      // setLoading(false);
    };
  }, [id]);

  return (
    <LazyLoad offset={200}>
      {/* <div className="w-100" {...children}>
        {loading ? (
          <Loading />
        ) : id ? (
          data ? (
            <img
              src={`data:${contentType};base64, ${data}`}
              alt={alt || ``}
              className="w-100 img--resource"
              style={{ maxHeight: height }}
            />
          ) : (
            <div className="text-danger text-center p-5">Ảnh không hợp lệ.</div>
          )
        ) : (
          <img
            src={ServerConfig.DEFAULT_THUMBNAIL}
            alt={alt || ``}
            className="w-100 img--resource"
            style={{ maxHeight: height }}
          />
        )}
      </div> */}
      {!loading ? (
        <>
          {!isPrivate ? (
            <img
              src={`data:${contentType};base64, ${data}`}
              alt={alt || ``}
              className="w-100 img--resource"
              style={{ maxHeight: height }}
            />
          ) : (
            <div className="p-5 text-center text-warning">
              <strong>Nội dung yêu cầu đăng nhập</strong>
              <br />
              <Link to="/dang-nhap" className="text-muted">Đăng nhập</Link>
              
            </div>
          )}
        </>
      ) : (
        <Loading />
      )}
    </LazyLoad>
  );
}
