import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import imageHelper from "../../../helpers/imageHelper";
import toastHelper from "../../../helpers/toastHelper";
import SettingService from "../../../services/SettingService";
import ResourceUploadSingleModal from "../ResourceManager/ResourceUploadSingleModal";

export default function GeneralManager() {
  const [visibleBackgroundUpload, setVisibleBackgroundUpload] = useState(false);
  const [slogan, setSlogan] = useState("");
  const [subSlogan, setSubSlogan] = useState("");
  const [sloganEdited, setSloganEdited] = useState(false);
  const [subSloganEdited, setSubSloganEdited] = useState(false);

  useEffect(() => {
    // Set slogan
    SettingService.getSetting("slogan").then((response) => {
      const { value } = response.data;
      setSlogan(value);
    });
    SettingService.getSetting("subslogan").then((response) => {
      const { value } = response.data;
      setSubSlogan(value);
    });
  }, []);

  const handleChangeBackground = (data) => {
    SettingService.setSetting(
      "background-url",
      imageHelper.getRawResourceUrl(data._id)
    ).then(() => {
      toastHelper.success("Thiết lập background mới thành công.");
    });
  };

  const handleChangeSlogan = ({ target }) => {
    setSloganEdited(true);
    setSlogan(target.value);
  };

  const handleUpdateSlogan = () => {
    setSloganEdited(false);
    SettingService.setSetting("slogan", slogan).then(() => {
      toastHelper.success("Thiết lập thành công slogan mới cho trang.");
    });
  };

  const handleChangeSubSlogan = ({ target }) => {
    setSubSloganEdited(true);
    setSubSlogan(target.value);
  };

  const handleUpdateSubSlogan = () => {
    setSubSloganEdited(false);
    SettingService.setSetting("subslogan", subSlogan).then(() => {
      toastHelper.success("Thiết lập thành công slogan phụ mới cho trang.");
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
        <Row sm={12} className="mb-2 mt-2 p-2">
          <Col className="text-secondary" md={2} sm={12}>
            Hình nền
          </Col>
          <Col md={10} sm={12}>
            <Button onClick={(_) => setVisibleBackgroundUpload(true)}>
              Thay đổi
            </Button>
          </Col>
        </Row>
        <Row className="mb-2 p-2 ">
          <Col className="text-secondary" sm={12} md={2}>
            Slogan
          </Col>
          <Col>
            <Form className="mb-2">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    value={slogan}
                    placeholder={`Nhập slogan và bấm thay đổi`}
                    onChange={handleChangeSlogan}
                  />
                </Col>
                <Col>
                  <Button disabled={!sloganEdited} onClick={handleUpdateSlogan}>
                    Cập nhật
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row className="mb-2 p-2 ">
          <Col className="text-secondary" sm={12} md={2}>
            Sub-slogan
          </Col>
          <Col>
            <Form className="mb-2">
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    value={subSlogan}
                    placeholder={`Nhập sub-slogan và bấm thay đổi`}
                    onChange={handleChangeSubSlogan}
                  />
                </Col>
                <Col>
                  <Button
                    disabled={!subSloganEdited}
                    onClick={handleUpdateSubSlogan}
                  >
                    Cập nhật
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
        <Row>
          <Container className="home__slogan fw-bold fs-5 text-light bg-dark mt-0 mb-0">
            <h1 className="ff-normal">{slogan}</h1>
            <h3 className="ff-handwriting">{subSlogan}</h3>
          </Container>
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
