import React from "react";
import { Modal, Form, Input, Checkbox } from "antd";

function ModifyUserModal({ visible, onConfirm, onCancel, user = null }) {
    const initUserInfo = {
        username: "",
        email: "",
        admin: false,
    };

    const [form] = Form.useForm();

    const handleConfirmModifyUser = () => {
        const newUserInfo = form.getFieldsValue(true);
        onConfirm(newUserInfo);
    };

    return (
        <>
            <Modal
                title="Chỉnh sửa tài khoản"
                visible={visible}
                okText="Xác nhận"
                onOk={handleConfirmModifyUser}
                cancelText="Đóng"
                onCancel={onCancel}
            >
                <Form
                    form={form}
                    name="modify-user"
                    initialValues={user || initUserInfo}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    <Form.Item label="Tên đăng nhập" name="username">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="admin"
                        valuePropName="checked"
                        wrapperCol={{ offset: 6, span: 18 }}
                    >
                        <Checkbox>Quản trị viên</Checkbox>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default ModifyUserModal;
