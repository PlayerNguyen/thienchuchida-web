import React, { useEffect, useState } from "react";
// import { Row, Col, Table, Checkbox, Space, Button } from "antd";
import { useDispatch } from "react-redux";
import ModifyUserModal from "../../Modal/ModifyUser";
import ConfirmModal from "../../Modal/Confirm";
import { v1 } from "uuid";
import { Button, Table } from "react-bootstrap";
import UserService from "../../../services/UserService";
import toast from "../../../helpers/toastHelper";

function AccountManagement() {
  const [users, setUsers] = useState(null);
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
  const [modifyUser, setModifyUser] = useState(null);
  const [confirmModalInfo, setConfirmModalInfo] = useState({
    visible: false,
    title: "",
    content: "",
    onConfirm: () => {},
  });
  // Random key for modify and confirm modal, for new instance every render
  const [randomKey, setRandomKey] = useState(v1());
  const [loading, setLoading] = useState(false);

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

  const handleCloseConfirmModal = () => {
    setConfirmModalInfo({ visible: false, title: "", content: "", onConfirm: () => {} });
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
   * Confirm to delete user
   * @param {Object} _deleteUser
   */
  const handleOpenConfirmDeleteUserModal = (_deleteUser) => {
    setConfirmModalInfo({
      visible: true,
      title: "Xoá tài khoản",
      content: `Bạn có chắc chắn muốn xoá tài khoản '${_deleteUser.username}'?`,
      onConfirm: () => handleConfirmDeleteUser(_deleteUser._id),
    });
    setRandomKey(v1());
  };

  /**
   *
   * @param {Object} _newUserInfo
   */
  const handleConfirmModifyUser = (_newUserInfo) => {
    let action = UserService.postSignUp; // Create new user
    const _newData = {
      ..._newUserInfo,
    };
    if (modifyUser) {
      //Modify exist user
      action = UserService.putAdminModifyUser;
      _newData._id = modifyUser._id;
    }
    setLoading(true);
    action(_newData)
      .then((resp) => {
        toast.success(resp.data.message);
        const newUser = resp.data.data;
        setUsers([...users.filter((_user) => _user._id !== newUser._id), { ...newUser }]);
        handleCloseModifyModal();
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleConfirmDeleteUser = (_id) => {
    setLoading(true);
    UserService.deleteAdminDeleteUser(_id)
      .then((resp) => {
        toast.success(resp.data.message);
        setUsers(users.filter((_user) => _user._id !== _id));
        handleCloseConfirmModal();
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * @param {String} _id
   * @param {InputEvent} _event
   */
  const handleToggleUserPermission = (_user) => {
    setConfirmModalInfo({
      visible: true,
      title: "Thay đổi quyền admin",
      content: `Bạn có chắc chắn muốn thay đổi quyền admin cho người dùng '${_user.username}'?`,
      onConfirm: () => handleConfirmToggleUserPermission(_user._id),
    });
  };

  const handleConfirmToggleUserPermission = (_id) => {
    setLoading(true);
    UserService.postAdminToggleUserPermission(_id)
      .then((resp) => {
        toast.success(resp.data.message);
        setUsers(
          users.map((_user) => ({
            ..._user,
            admin: _user._id === _id ? !_user.admin : _user.admin,
          }))
        );
        handleCloseConfirmModal();
      })
      .catch((err) => {
        toast.error(err.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
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
      key: "admin",
      render: (record) => (
        <input
          type="checkbox"
          readOnly
          checked={record.admin}
          onChange={(e) => handleToggleUserPermission(record, e)}
        />
      ),
    },
    {
      title: "#",
      key: "actions",
      render: (record) => (
        <>
          <Button variant="link" onClick={() => handleOpenModifyModal(record)}>
            Chỉnh sửa
          </Button>
          <Button variant="link" onClick={() => handleOpenConfirmDeleteUserModal(record)}>
            Xoá
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button variant="link" className="w-fit" onClick={() => handleOpenModifyModal()}>
        Thêm tài khoản mới
      </Button>
      <Table responsive>
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
          {users &&
            users.map((_user, _idx) => (
              <tr key={_user._id}>
                <td>{_idx + 1}</td>
                {columns.map((__col) => (
                  <td key={__col.key}>
                    {__col.render
                      ? __col.render(__col.dataIndex ? _user[__col.dataIndex] : _user)
                      : _user[__col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
      <ModifyUserModal
        user={modifyUser}
        visible={isModifyModalVisible}
        onClose={handleCloseModifyModal}
        onConfirm={handleConfirmModifyUser}
        key={`${randomKey}mum`}
        loading={loading}
      />
      <ConfirmModal
        key={`${randomKey}cm`}
        visible={confirmModalInfo.visible}
        title={confirmModalInfo.title}
        content={confirmModalInfo.content}
        onConfirm={confirmModalInfo.onConfirm}
        onClose={handleCloseConfirmModal}
        loading={loading}
      />
    </>
  );
}

export default AccountManagement;
