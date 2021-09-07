import React, { useEffect, useState } from "react";
// import { Row, Col, Table, Checkbox, Space, Button } from "antd";
import { useDispatch } from "react-redux";
import ModifyUserModal from "../../Modal/ModifyUser";
import { v1 } from "uuid";
import { Button, Table, Row, Col } from "reactstrap";
import UserService from "../../../services/UserService";

function AccountManagement() {
    const [users, setUsers] = useState([]);
    const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
    const [modifyUser, setModifyUser] = useState(null);
    // Random key for modify modal, for new instance every render
    const [randomKey, setRandomKey] = useState(v1());

    const dispatch = useDispatch();

    useEffect(() => {
        getAllUser();
    }, [dispatch]);

    const getAllUser = async () => {
        try {
            const resp = await UserService.getAllUsers();
            setUsers(resp.data.data);
        } catch (e) {
            console.error(e);
        }
    };

    const handleCloseModifyModal = () => {
        setModifyUser(null);
        setIsModifyModalVisible(false);
    };

    /**
     *
     * @param {Object} _modifyUser
     */
    const handleOpenModifyModal = (_modifyUser = null) => {
        setModifyUser(_modifyUser);
        setIsModifyModalVisible(true);
        setRandomKey(v1());
    };

    /**
     *
     * @param {Object} _newUserInfo
     */
    const handleConfirmModifyUser = (_newUserInfo) => {
        if (!modifyUser) {
            // Create new user
        } else {
            // Modify exist user
        }
    };

    const columns = [
        {
            title: "Tên đăng nhập",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Quản trị viên",
            dataIndex: "admin",
            key: "admin",
            render: (admin) => (
                <>
                    <input type="checkbox" readOnly checked={admin} />
                </>
            ),
        },
        {
            title: "#",
            key: "actions",
            render: (record) => (
                <>
                    <Button color="link" onClick={() => handleOpenModifyModal(record)}>
                        Chỉnh sửa
                    </Button>
                    <Button color="link">Xoá</Button>
                </>
            ),
        },
    ];

    return (
        <>
            <div className="row">
                <div className="col-10 offset-1">Col 4</div>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            {columns.map((_col) => (
                                <th key={_col.key} scope="col">
                                    {_col.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((_user, _idx) => (
                            <tr key={_user._id}>
                                <td>{_idx + 1}</td>
                                {columns.map((__col) => (
                                    <td key={__col.key}>
                                        {__col.render
                                            ? __col.render(
                                                  __col.dataIndex ? _user[__col.dataIndex] : _user
                                              )
                                            : _user[__col.dataIndex]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <ModifyUserModal
                user={modifyUser}
                visible={isModifyModalVisible}
                onCancel={handleCloseModifyModal}
                onConfirm={handleConfirmModifyUser}
                key={randomKey}
            />
        </>
    );
}

export default AccountManagement;
