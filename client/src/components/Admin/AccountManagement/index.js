import React, { useEffect, useState } from "react";
// import { Row, Col, Table, Checkbox, Space, Button } from "antd";
import { useDispatch } from "react-redux";
import ModifyUserModal from "../../Modal/ModifyUser";
import { v1 } from "uuid";

function AccountManagement() {
  const sampleData = [
    {
      _id: 1,
      username: "admin",
      email: "admin@ttcd.gmail.com",
      admin: true,
    },
    {
      _id: 2,
      username: "user",
      email: "user@ttcd.gmail.com",
      admin: false,
    },
  ];
  const [users, setUsers] = useState(sampleData);
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
  const [modifyUser, setModifyUser] = useState(null);
  // Random key for modify modal, for new instance every render
  const [randomKey, setRandomKey] = useState(v1());

  const dispatch = useDispatch();

  useEffect(() => {
    // Get users here
  }, [dispatch]);

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
          <input class="form-check-input" type="checkbox" checked={admin} />
        </>
      ),
    },
    {
      title: "#",
      key: "actions",
      render: (record) => (
        <>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => handleOpenModifyModal(record)}
            data-bs-toggle="modal"
            data-bs-target="modifyUserModal"
          >
            Chỉnh sửa
          </button>
          <button type="button" className="btn btn-link">
            Xoá
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="__wrapper">
        <div className="col-10 offset-1">Col 4</div>
        <table className="table">
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
        </table>
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
