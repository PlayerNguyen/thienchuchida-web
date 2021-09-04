import React, { useEffect, useState } from "react";
// import { Row, Col, Table, Checkbox, Space, Button } from "antd";
import { useDispatch } from "react-redux";
import ModifyUserModal from "../../Modal/ModifyUser";
import { v1 } from "uuid";

function AccountManagement() {
  const [users, setUsers] = useState([]);
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
      render: (admin) => <>{/* <Checkbox checked={admin} /> */}</>,
    },
    {
      title: "#",
      key: "actions",
      render: (text, record) => (
        <>
          {/* <Space size="middle">
                        <Button type="link" onClick={() => handleOpenModifyModal(record)}>
                            Chỉnh sửa
                        </Button>
                        <Button type="link">Xoá</Button>
                    </Space> */}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-4">Col 4</div>
        <div className="col-4">Col 4</div>
        <div className="col-4">
          <span className="text-success">Success text</span>
        </div>
      </div>
      {/* <Row>
                <Col span={20} offset={2}>
                    <Table dataSource={sampleData} columns={columns} />
                </Col>
            </Row> */}
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
