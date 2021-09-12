import React, { useEffect, useState } from "react";
// import { Row, Col, Table, Checkbox, Space, Button } from "antd";
import { useDispatch } from "react-redux";
import ModifyUserModal from "../../Modal/ModifyUser";
import { v1 } from "uuid";
import { Button, Table } from "react-bootstrap";
import UserService from "../../../services/UserService";
import { toast } from "react-toastify";

function AccountManagement() {
  const [users, setUsers] = useState([]);
  const [isModifyModalVisible, setIsModifyModalVisible] = useState(false);
  const [modifyUser, setModifyUser] = useState(null);
  // Random key for modify modal, for new instance every render
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
    let action = UserService.postAdminCreateUser; // Create new user
    const _newData = {
      ..._newUserInfo,
    };
    if (modifyUser) {
      //Modify exist user
      action = UserService.putAdminModifyUser;
      _newData.id = modifyUser.id;
    }
    action(_newData)
      .then((data) => {
        setLoading(false);
        toast.success(data.message);
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
      dataIndex: "admin",
      key: "admin",
      render: (admin) => <input type="checkbox" readOnly checked={admin} />,
    },
    {
      title: "#",
      key: "actions",
      render: (record) => (
        <>
          <Button variant="link" onClick={() => handleOpenModifyModal(record)}>
            Chỉnh sửa
          </Button>
          <Button variant="link">Xoá</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button variant="link" className="w-fit" onClick={() => handleOpenModifyModal()}>
        Thêm tài khoản mới
      </Button>
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
        key={randomKey}
        loading={loading}
      />
    </>
  );
}

export default AccountManagement;
