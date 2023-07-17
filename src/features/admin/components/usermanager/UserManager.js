import React, { useEffect, useState } from "react";
import userApi from "../../../../api/userApi";
import "./usermanager.scss";
import { Table, Space, Input, Modal } from "antd";
import axios from "axios";

const { Search } = Input;

const UserManager = () => {
  const [successStatus, setSuccessStatus] = useState("");

  const [listUser, setListUser] = useState([]);
  const [listUserAll, setListUserAll] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [isModalShowVisible, setIsModalShowVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState({});
  const { username, isActive, phoneNumber, gender, dob } = modelCurrentAction;
  const [actionChange, setActionChange] = useState(true);
  // const {name}
  useEffect(() => {
    userApi
      .getUser()
      .then((res) => {
        console.log(res);
        setListUser(res.data);
        setListUserAll(res.data);
      })
      .catch((error) => {
        console.log("Failed to fetch UserList:", error);
      });
  }, [actionChange]);

  const showShowModal = () => {
    setIsModalShowVisible(true);
  };
  const handleShowOk = () => {
    setIsModalShowVisible(false);
  };
  const handleShowCancel = () => {
    setIsModalShowVisible(false);
  };

  const showUpdateModal = () => {
    setSuccessStatus("");
    setIsModalUpdateVisible(true);
  };
  const handleUpdateOk = () => {
    userApi
      .UserToEmployee(modelCurrentAction.id)
      .then((response) => {
        if (response.data != null) {
          alert("Update user successful");
          setActionChange(!actionChange);
          setIsModalUpdateVisible(false);
        } else
          setSuccessStatus("Cannot get to update user", response.data.message);
      })
      .catch((error) => {
        console.log(error);
        setSuccessStatus("Can not update user");
      });
  };
  const handleUpdateCancel = () => {
    setIsModalUpdateVisible(false);
  };

  const showDeleteModal = () => {
    // setIsModalDeleteVisible(true);
    setSuccessStatus("");
    setIsModalDeleteVisible(true);
  };
  const handleDeleteOk = () => {
    userApi
      .activeUser( modelCurrentAction.id)
      .then((response) => {
        if (response.data) {
          alert("Update user successful");
          setActionChange(!actionChange);
          setIsModalDeleteVisible(false);
        } else
          setSuccessStatus("Cannot get to update user", response.data.message);
      })
      .catch((error) => {
        console.log(error);
        setSuccessStatus("Can not update user");
      });
  };
  const handleDeleteCancel = () => {
    setIsModalDeleteVisible(false);
  };

  const searchClick = () => {
    const filteredData = listUserAll.filter(
      (entry) =>
        entry.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        (entry.username || "")
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        (entry.phoneNumber || "").toLowerCase() == searchValue.toLowerCase()
    );
    setListUser(filteredData);
  };

  const searchChange = (user) => setSearchValue(user.target.value);

  const onchangeModelCurrentAction = (user) => {
    // console.log(modelCurrentAction.description);
    setModelCurrentAction({
      ...modelCurrentAction,
      [user.target.name]: user.target.value,
    });
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      filterMode: "tree",
      width: 100,
    },
    {
      title: "Name",
      dataIndex: "username",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Is active",
      dataIndex: "active",
      render: (text) => String(text),
      sorter: (a, b) => a.active - b.active,
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      render: (text) => String(text),
      sorter: (a, b) => a.active - b.active,
    },
    {
      title: "Gender",
      dataIndex: "gender",
      render: (text) => String(text),
      sorter: (a, b) => a.gender - b.gender,
    },
    {
      title: "Date of birth",
      dataIndex: "dob",
      render: (text) => String(text),
      sorter: (a, b) => a.date_of_birth - b.date_of_birth,
    },
    {
      title: "Action",
      key: "action",
      render: (index, record) => (
        <Space className="action-button" size="middle">
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              setModelCurrentAction(record);
              showShowModal();
            }}
          >
            Show
          </button>
          <button
            type="button"
            class="btn btn-success"
            onClick={() => {
              setModelCurrentAction(record);
              showUpdateModal();
            }}
          >
            Update
          </button>
          <button
            type="button"
            class={record.active ? "btn btn-danger" : "btn btn-info"}
            onClick={() => {
              setModelCurrentAction(record);
              showDeleteModal();
            }}
          >
            {record.active ? "Unactive" : "Active"}
          </button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Modal
        title="Show user's informations"
        open={isModalShowVisible}
        onOk={handleShowOk}
        onCancel={handleShowCancel}
      >
        <p>SHOW {modelCurrentAction.name}'s INFORMATION</p>
        <div class="form-group">
          <label for="name">ID: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="id"
            value={modelCurrentAction.id}
            disabled
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Name: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="name"
            value={modelCurrentAction.username}
            disabled
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Phone number: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="phone_number"
            value={modelCurrentAction.phoneNumber}
            disabled
          ></input>
        </div>

        <label>Gender: </label>
        <select
          name="gender"
          readonly
          id="gender"
          class="form-control"
          value={modelCurrentAction.gender}
          disabled
        >
          <option value="	undefined">Chưa cập nhật</option>
          <option value="nam">Nam</option>
          <option value="nu">Nữ</option>
        </select>

        <div class="date">
          <label for="birthday">Date of birth: </label>
          <input
            type="date"
            readonly
            class="form-control"
            id="birthday"
            value={modelCurrentAction.dob}
            disabled
          ></input>
        </div>
      </Modal>
      <Modal
        title="Change to employee"
        open={isModalUpdateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <p>ARE YOU SURE TO CHANGE {username} INTO EMPLOYEE'S ROLE</p>
        <div class="form-group">
          <label for="id">ID: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="id"
            value={modelCurrentAction.id}
            disabled
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Name: </label>
          <input
            type="name"
            name="name"
            class="form-control"
            id="name"
            placeholder="Enter username"
            value={modelCurrentAction.username}
            disabled
          ></input>
        </div>

        <div class="form-group">
          <i style={{ color: "red" }}>{successStatus}</i>
        </div>
      </Modal>
      <Modal
        title="Update active"
        open={isModalDeleteVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>
          ARE YOU SURE TO {modelCurrentAction.isActive ? "UNACTIVE" : "ACTIVE"}{" "}
          {username}{" "}
        </p>
        <div class="form-group">
          <label for="name">ID: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="id"
            value={modelCurrentAction.id}
            disabled
          ></input>
        </div>

        <div class="form-group">
          <label for="name">Name: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="name"
            value={modelCurrentAction.username}
            disabled
          ></input>
        </div>
      </Modal>
      <div className="user-utilities">
        <Search
          allowClear
          className="search"
          placeholder="Input search text"
          enterButton
          onSearch={searchClick}
          value={searchValue}
          onChange={searchChange}
        />
      </div>
      <div className="user-table-container">
        <Table
          className="user-table"
          scroll={{
            x: 1200,
          }}
          columns={columns}
          dataSource={listUser}
        />
      </div>
    </>
  );
};

export default UserManager;
