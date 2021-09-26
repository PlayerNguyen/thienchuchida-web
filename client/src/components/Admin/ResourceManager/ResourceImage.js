import React, { useEffect, useState } from "react";
import axiosInstance from "../../../helpers/axiosInstance";
import imageHelper from "../../../helpers/imageHelper";
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
        .get(imageHelper.getRawResourceUrl(id))
        .then((response) => {
          const { headers } = response;
          setContentType(headers["content-type"]);
          setData(response.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className="w-100" {...children}>
      {loading ? (
        <div className="text-secondary text-center p-5">Đang tải...</div>
      ) : id ? (
        data ? (
          <img
            src={`data:${contentType};base64, ${data}`}
            alt={alt || ``}
            className="w-100 img--resource"
            style={{ height: height }}
          />
        ) : (
          <div className="text-danger text-center p-5">
            Ảnh không hợp lệ.
          </div>
        )
      ) : (
        <div className="text-danger text-center p-5">
          Mã ảnh không hợp lệ.
        </div>
      )}
    </div>
  );
}
