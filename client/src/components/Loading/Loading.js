import React from "react";
import "./Loading.scss";

export default function Loading({ color }) {
  return (
    <div className="loading">
      <div className="lds-ellipsis">
        <div style={{ background: color }}></div>
        <div style={{ background: color }}></div>
        <div style={{ background: color }}></div>
        <div style={{ background: color }}></div>
      </div>
    </div>
  );
}
