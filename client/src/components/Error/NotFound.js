import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <Container fluid>
      <div className="text-center">
        <h1 className="fw-bold text-danger">
          Không tìm thấy trang này (404). 
          
        </h1>
        <h1 className="fw-bold text-danger">
          <Link to="/" className="text-primary">Trở lại trang chủ.</Link>
        </h1>
      </div>
    </Container>
  );
}
