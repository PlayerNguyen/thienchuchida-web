import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import imageHelper from "../../../helpers/imageHelper";
import toastHelper from "../../../helpers/toastHelper";
import SettingService from "../../../services/SettingService";
import ResourceUploadSingleModal from "../ResourceManager/ResourceUploadSingleModal";

export default function GeneralManager() {
  const [visibleBackgroundUpload, setVisibleBackgroundUpload] = useState(false);

  const handleChangeBackground = (data) => {
    SettingService.setSetting(
      "background-url",
      imageHelper.getRawResourceUrl(data._id)
    ).then(() => {
      toastHelper.success("Thiết lập background mới thành công.");
    });
  };

  return (
    <div className="">
      <h1 className="fw-bold">Quản lý chung</h1>
      {/* Section one */}
      <Container fluid={"xs"}>
        <Row>
          <Col>
            <h3 className="text-secondary">Cài đặt chung</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={2}>Hình nền</Col>
          <Col>
            <Button onClick={(_) => setVisibleBackgroundUpload(true)}>
              Thay đổi
            </Button>
          </Col>
        </Row>
      </Container>
      <ResourceUploadSingleModal
        visible={visibleBackgroundUpload}
        onClose={(_) => setVisibleBackgroundUpload(false)}
        onDone={handleChangeBackground}
      />
    </div>
  );
}
