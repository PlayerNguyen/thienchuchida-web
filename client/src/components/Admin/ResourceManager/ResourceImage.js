import React, { useEffect, useState } from "react";
import axiosInstance from "../../../helpers/axiosInstance";
import imageHelper from "../../../helpers/imageHelper";
import Loading from "../../Loading/Loading";
import "./ResourceItem.scss";

export default function ResourceImage({ id, alt, height, ...children }) {
  const [contentType, setContentType] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // Set loading an image to true
      setLoading(true);

      // Then load it
      axiosInstance
        .get(imageHelper.gertBase64ResourceUrl(id))
        .then((response) => {
          const { headers } = response;
          setContentType(headers["content-type"]);
          setData(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    // Clean up the component
    return () => {
      setLoading(false)
      setContentType(null)
      setLoading(false)
    };
  }, [id]);

  return (
    <div className="w-100" {...children}>
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
        <div className="text-danger text-center p-5">
          Không có ảnh (không tìm thấy ảnh)
        </div>
      )}
    </div>
  );
}
