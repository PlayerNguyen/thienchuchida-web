import React from "react";

export default function UnknownImage(height, width) {
  return (
    <div
      className="p-5 text-muted bg-white text-center"
      style={{ height: height, width: width || "auto" }}
    >
      <p className="m-0">
        <strong>Chưa có ảnh</strong>
      </p>
    </div>
  );
}
