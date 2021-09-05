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
            <div
                class="modal fade"
                id="modifyUserModal"
                tabindex="-1"
                aria-labelledby="modifyUserModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modifyUserModalLabel">
                                Modal title
                            </h5>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">...</div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" class="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModifyUserModal;
