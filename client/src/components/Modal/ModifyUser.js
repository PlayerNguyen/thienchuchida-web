import React from "react";
// import { Modal, Form, Input, Checkbox } from "antd";

function ModifyUserModal({ visible, onConfirm, onCancel, user = null }) {
    const initUserInfo = {
        username: "",
        email: "",
        admin: false,
    };

    // const [form] = Form.useForm();

    const handleConfirmModifyUser = () => {
        // const newUserInfo = form.getFieldsValue(true);
        // onConfirm(newUserInfo);
    };

    return (
        <>
        </>
    );
}

export default ModifyUserModal;
