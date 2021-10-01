import React from "react";
import LazyLoader from "react-lazyload";
import Loading from "./Loading";

export default function LazyLoad({ color, ...children }) {
  return (
    <LazyLoader placeholder={<Loading color={color} />}>
      {...children}
    </LazyLoader>
  );
}
