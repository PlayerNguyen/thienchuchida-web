import "./NotifyCard.scss";
import React, { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import NotifyService from "../../services/NotifyService";
import toastHelper from "../../helpers/toastHelper";
import Confirm from "../Confirm/Confirm";
import { useSelector } from "react-redux";
import NotifyEditModal from "../Admin/NotifyManager/NotifyEditModal";

export default function NotifyCard({
  notifyId,
  notifyTitle,
  notifyContext,
  onRemove,
  onUpdate,
  ...children
}) {
  const [visibleRemovePopup, setVisibleRemovePopup] = useState(false);
  const [removing, setRemoving] = useState(false);

  const [visibleEditModal, setVisibleEditModal] = useState(false);

  const persistUser = useSelector((state) => state.auth.persistUser);

  const handleRemove = () => {
    // Set remove to true
    setRemoving(true);

    // Then remove this card
    NotifyService.deleteNotify(notifyId)
      .then((response) => {
        const { message } = response.data;
        toastHelper.success(message);
        onRemove(notifyId);
      })
      .then(() => {
        setRemoving(false);
        setVisibleRemovePopup(false);
      });
  };

  return (
    <>
      <Col xs={12} className="text-light notify__wrapper" {...children}>
        <Row>
          <Col xs={12}>
            <h2>{notifyTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: notifyContext }}></div>
          </Col>
          {persistUser && persistUser.admin && (
            <Col className="d-flex gap-2">
              <Button
                variant={`outline-primary`}
                onClick={(_) => setVisibleEditModal(true)}
              >
                Sửa
              </Button>
              <Button
                variant={`outline-danger`}
                disabled={removing}
                onClick={(_) => setVisibleRemovePopup(true)}
              >
                {removing ? `Đang xoá...` : `Xoá`}
              </Button>
            </Col>
          )}
        </Row>
      </Col>
      <Confirm
        visible={visibleRemovePopup}
        onClose={(_) => setVisibleRemovePopup(false)}
        title={`Xoá thông báo`}
        context={`Bạn có chắc chắn muốn xoá thông báo trên? Bạn sẽ không thể hoàn tác việc vừa làm.`}
        onAccept={handleRemove}
        onDeny={(_) => setVisibleRemovePopup(false)}
        acceptVariant={`danger`}
        denyVariant={`primary`}
      />
      <NotifyEditModal
        visible={visibleEditModal}
        onClose={(_) => setVisibleEditModal(false)}
        onUpdate={(data) => {
          onUpdate(data)
        }}
        notify={{
          _id: notifyId,
          title: notifyTitle,
          context: notifyContext,
        }}
      />
    </>
  );
}
