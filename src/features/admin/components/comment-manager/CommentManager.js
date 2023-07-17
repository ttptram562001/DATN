import React, { useEffect, useState } from "react";
import userApi from "../../../../api/userApi";
import "./CommentManager.scss";
import { Table, Space, Input, Modal } from "antd";
import axios from "axios";
import cmtApi from "../../../../api/cmtApi";

const { Search } = Input;

const CommentManager = () => {
  const [successStatus, setSuccessStatus] = useState("");

  const [listComment, setlistComment] = useState([]);
  const [listCommentAll, setlistCommentAll] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const [isModalShowVisible, setIsModalShowVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState({});
  const { id, bookName, username, content, isActive, createdAt } = modelCurrentAction;
  const [actionChange, setActionChange] = useState(true);
  // const {name}
  useEffect(() => {
    cmtApi.getAll()
      .then((res) => {
        console.log(res);
        setlistComment(res.data);
        setlistCommentAll(res.data);
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
    // setIsModalUpdateVisible(true);
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
    cmtApi.activeCmt(modelCurrentAction.id)
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
    const filteredData = listCommentAll.filter(
      (entry) =>
        entry.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        (entry.name || "")
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        (entry.phone_number || "").toLowerCase() == searchValue.toLowerCase()
    );
    setlistComment(filteredData);
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
      title: "Book",
      dataIndex: "bookName",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Content",
      dataIndex: "content",
      render: (text) => String(text),
      sorter: (a, b) => a.active - b.active,
    },
    {
      title: "Date of birth",
      dataIndex: "createdAt",
      render: (text) => String(text),
      sorter: (a, b) => a.date_of_birth - b.date_of_birth,
    },
    {
        title: "Is active",
        dataIndex: "active",
        render: (text) => String(text),
        sorter: (a, b) => a.active - b.active,
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
        title="Show Comment"
        open={isModalShowVisible}
        onOk={handleShowOk}
        onCancel={handleShowCancel}
      >
        <p>SHOW COMMENT {modelCurrentAction.id} INFORMATION</p>
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
          <label for="name">Book: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="book"
            value={modelCurrentAction.bookName}
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
          <label for="name">Content: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="content"
            value={modelCurrentAction.content}
            disabled
          ></input>
        </div>

        <div class="date">
          <label for="createdAt">Created at: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="createdAt"
            value={modelCurrentAction.createdAt}
            disabled
          ></input>
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
          {"COMMENT"}
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
          <label for="name">Content: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="name"
            value={modelCurrentAction.content}
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
          dataSource={listComment}
        />
      </div>
    </>
  );
};

export default CommentManager;
