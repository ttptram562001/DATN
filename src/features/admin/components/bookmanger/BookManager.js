import React from "react";
import "./book.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import { useState, useEffect } from "react";
import { Table, Space, Input, Modal } from "antd";
import bookApi from "../../../../api/bookApi";
import axios from "axios";
const { Search } = Input;

const BookManager = () => {
  const entryModal = {
    title: "",
    isbn: "",
    author: "",
    yearOfPublication: "",
    publisher: "",
    description: "",
    price: "",
    amount: "",
    idBookTypeDetail: "",
    is_active: true,
  };
  const [successStatus, setSuccessStatus] = useState("");
  const [books, setBooks] = useState([]);
  const [listTour, setListTour] = useState([]);
  const [listTourAll, setListTourAll] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
  const [modelCurrentAction, setModelCurrentAction] = useState(false);
  const [actionChange, setActionChange] = useState(true);
  const [bookType, setBookType] = useState("");
  const [bookTypeDetail, setBookTypeDetail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    id,
    isbn,
    title,
    author,
    publisher,
    yearOfPublication,
    amount,
    description,
    price,
    idBookTypeDetail,
    is_active,
  } = modelCurrentAction;
  useEffect(() => {
    bookApi
      .getAll()
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [actionChange]);

  const showAddModal = () => {
    setSuccessStatus("");

    setIsModalAddVisible(true);
    setModelCurrentAction(entryModal);
    bookApi.getBookType().then((res) => {
      renderData(res.data, "bookType");
    });
  };
  const handleAddOk = async () => {
    if (
      author === "" ||
      title === "" ||
      description === "" ||
      price === "" ||
      amount === "" ||
      idBookTypeDetail === "" ||
      publisher === "" ||
      yearOfPublication === ""
    ) {
      setSuccessStatus("Not enough information");
      return;
    }
    bookApi
      .createBook(modelCurrentAction)
      .then((response) => {
        if (response.data != null) {
          setModelCurrentAction(entryModal);
          alert("Add service successful");
          setActionChange(!actionChange);
          setIsModalAddVisible(false);
        } else setSuccessStatus("Can not create book");
      })
      .catch((error) => {
        console.log(error);
        setSuccessStatus("Can not create book");
      });
  };
  const handleAddCancel = () => setIsModalAddVisible(false);
  const showImageModal = () => setIsModalImageVisible(true);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    console.log(modelCurrentAction.id);
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:8080/api/books/upload-image/${modelCurrentAction.id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageOk = () => {
    setActionChange(!actionChange);
    console.log(modelCurrentAction.image);
    if (modelCurrentAction.image == null) {
      handleSubmit();
      alert("Upload image successful");
      setIsModalImageVisible(false);
    } else {
      setIsModalImageVisible(false);
    }
  };
  const handleImageCancel = () => {
    setActionChange(!actionChange);
    setIsModalImageVisible(false);
  };

  const showUpdateModal = () => {
    setSuccessStatus("");
    setIsModalUpdateVisible(true);
  };
  const handleUpdateOk = () => {
    if (
      author === "" ||
      title === "" ||
      description === "" ||
      price === "" ||
      amount === "" ||
      publisher === "" ||
      yearOfPublication === ""
    ) {
      setSuccessStatus("Not enough infomation");
      return;
    }
    // const modelUpdate = {
    //     author: modelCurrentAction.author,
    //     isbn: modelCurrentAction.isbn,
    //     title: modelCurrentAction.title,
    //     price: modelCurrentAction.price,
    //     publisher: modelCurrentAction.publisher,
    //     yearOfPublication: modelCurrentAction.yearOfPublication,
    //     amount: Number(modelCurrentAction.amount),
    //     description: modelCurrentAction.description,
    // }

    // const modelUpdate = {
    //   "isbn": 123456789,
    //   "title" : "Hậu cung như ý truyện",
    //   "author" : "Lưu Liễm Tử",
    //   "publisher": "NXB Văn Học",
    //   "amount": 60,
    //   "description": "Sau khi vua Ung Chính băng hà, Tứ a ca Hoằng Lịch kế vị, lấy hiệu là Càn Long. Thanh Anh ý thức được vị thế của mình nên quyết định làm theo lời cô mẫu dặn trước khi qua đời để đứng vững trong hậu cung, thành ý của Thanh Anh được Thái hậu chấp thuận và nàng được bà ban tên mới là Như Ý.",
    //   "price": 25000,
    //   "yearOfPublication": 2019
    // }

    bookApi
      .updateBook(modelCurrentAction.id, modelCurrentAction)
      .then((response) => {
        if (response.data != null) {
          setModelCurrentAction(entryModal);
          alert("Service update successful");
          setActionChange(!actionChange);
          setIsModalUpdateVisible(false);
        } else setSuccessStatus("Can not update book");
      })
      .catch((error) => {
        console.log(error);
        setSuccessStatus("Can not update ");
      });
  };
  const handleUpdateCancel = () => setIsModalUpdateVisible(false);
  const showActiveModal = () => {
    setSuccessStatus("");
    setIsModalDeleteVisible(true);
  };
  const showDeleteModal = () => {
    setSuccessStatus("");
    setIsModalDeleteVisible(true);
  };
  const handleDeleteOk = () => {
    bookApi
      .activeBook(modelCurrentAction.id)
      .then((response) => {
        if (response.data) {
          setModelCurrentAction(entryModal);
          alert("update book successfull");
          setActionChange(!actionChange);
          setIsModalDeleteVisible(false);
        } else setSuccessStatus("Update book failed");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDeleteCancel = () => setIsModalDeleteVisible(false);

  const searchClick = () => {
    const filteredData = books.filter(
      (entry) =>
        entry.id.toString().toLowerCase().includes(searchValue.toLowerCase()) ||
        entry.title
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        entry.price.toString().toLowerCase() == searchValue.toLowerCase()
    );
    setBooks(filteredData);
  };
  const searchChange = (event) => setSearchValue(event.target.value);

  const onchangeModelCurrentAction = (event) => {
    setModelCurrentAction({
      ...modelCurrentAction,
      [event.target.name]: event.target.value,
    });
  };

  /** handle add book */

  var renderData = (array, select) => {
    let row = ' <option disable value="">chọn</option>';
    console.log(array);
    array.forEach((element) => {
      row += `<option value="${element.id}">${element.name}</option>`;
    });
    document.querySelector("#" + select).innerHTML = row;
  };

  const callApiBookTypeDetail = (e) => {
    bookApi.getBookTypeDetailsById(e.target.value).then((res) => {
      renderData(res.data, "bookTypeDetail");
    });
  };

  const handleChangeBookType = (e) => {
    setBookType(() => setBookType(e.target.value));
    callApiBookTypeDetail(e);
  };

  //

  const handleChangeBookTypeDetail = (e) => {
    setBookTypeDetail(() => setBookTypeDetail(e.target.value));
    setModelCurrentAction({
      ...modelCurrentAction,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeFile = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      filterMode: "tree",
      width: 100,
      fixed: "left",
    },
    {
      title: "ISBN",
      dataIndex: "isbn",
      sorter: (a, b) => a.name.length - b.name.length,
      width: 150,
    },
    {
      title: "Title",
      dataIndex: "title",
      sorter: (a, b) => a.name.length - b.name.length,
      width: 200,
    },
    {
      title: "Author",
      dataIndex: "author",
      sorter: (a, b) => a.name.length - b.name.length,
      width: 220,
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      sorter: (a, b) => a.name.length - b.name.length,
      width: 200,
    },
    {
      title: "Year of publication",
      dataIndex: "yearOfPublication",
      sorter: (a, b) => a.name.length - b.name.length,
      width: 150,
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 500,
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      width: 150,
    },
    {
      title: "Is active",
      dataIndex: "active",
      render: (text) => String(text),
      sorter: (a, b) => a.is_active - b.is_active,
      width: 100,
    },
    // {
    //   title: "Create At",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix(),
    //   width: 200,
    // },
    // {
    //   title: "Update At",
    //   dataIndex: "updatedAt",
    //   key: "updatedAt",
    //   sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
    //   width: 200,
    // },
    {
      title: "Action",
      key: "action",
      width: 280,
      fixed: "right",
      render: (index, record) => (
        <Space className="action-button" size="middle" key={index}>
          <button
            type="button"
            class="btn btn-primary"
            onClick={() => {
              setModelCurrentAction(record);
              showImageModal();
            }}
          >
            Image
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
      {/* Add */}
      <Modal
        title="Add new book"
        visible={isModalAddVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <form action="">
          <div class="form-group">
            <label for="title">Title: </label>
            <input
              type="name"
              class="form-control"
              placeholder="Enter title"
              value={title}
              name="title"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>
          <div class="form-group">
            <label for="isbn">ISBN: </label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter ISBN"
              value={isbn}
              name="isbn"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>
          <div class="form-group">
            <label for="author">Author: </label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter address"
              value={author}
              name="author"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>
          <div class="form-group">
            <label for="yearOfPublication">Year of publisher: </label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter year publish"
              value={yearOfPublication}
              name="yearOfPublication"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>
          <div class="form-group">
            <label for="publisher">publisher: </label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter publisher"
              value={publisher}
              name="publisher"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>
          <div class="form-group">
            <label for="name">Description: </label>
            <textarea
              class="form-control"
              type="description"
              rows="5"
              placeholder="Enter description"
              value={description}
              name="description"
              onChange={onchangeModelCurrentAction}
            ></textarea>
          </div>
          <div class="form-group">
            <select
              value={bookType}
              onChange={(e) => handleChangeBookType(e)}
              name=""
              id="bookType"
            >
              <option value="">Book Type</option>
            </select>
          </div>

          <div class="form-group">
            <select
              value={bookTypeDetail}
              onChange={(e) => handleChangeBookTypeDetail(e)}
              name="idBookTypeDetail"
              id="bookTypeDetail"
            >
              <option value="">Book Type</option>
            </select>
          </div>

          <div class="form-group">
            <label for="name">Price: </label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter price (VND)"
              value={price}
              name="price"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>
          <div class="form-group">
            <label for="amount">Amount: </label>
            <input
              type="number"
              class="form-control"
              placeholder="Enter amount"
              value={amount}
              name="amount"
              onChange={onchangeModelCurrentAction}
            ></input>
          </div>

          <label>Is active: </label>
          <select
            name="is_active"
            class="form-control"
            value={is_active}
            onChange={onchangeModelCurrentAction}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          <div class="form-group">
            <i style={{ color: "red" }}>{successStatus}</i>
          </div>
        </form>
      </Modal>

      {/* image */}

      <Modal
        title="image"
        open={isModalImageVisible}
        onOk={handleImageOk}
        onCancel={handleImageCancel}
      >
        {modelCurrentAction.image === null ? (
          <div class="form-group">
            <label for="image">Image: </label>
            <input
              type="file"
              class="form-control"
              onChange={onChangeFile}
            ></input>
          </div>
        ) : (
          <div>
            <img
              src={`http://localhost:8080/file/images/${modelCurrentAction.image}`}
              alt=""
              width={200}
            />
          </div>
        )}
      </Modal>

      {/* update */}
      <Modal
        title="Update"
        visible={isModalUpdateVisible}
        onOk={handleUpdateOk}
        onCancel={handleUpdateCancel}
      >
        <div class="form-group">
          <label for="title">Title: </label>
          <input
            type="name"
            class="form-control"
            placeholder="Enter title"
            value={title}
            name="title"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
        <div class="form-group">
          <label for="isbn">ISBN: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter ISBN"
            value={isbn}
            name="isbn"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
        <div class="form-group">
          <label for="author">Author: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter address"
            value={author}
            name="author"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
        <div class="form-group">
          <label for="yearOfPublication">Year of publisher: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter year publish"
            value={yearOfPublication}
            name="yearOfPublication"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
        <div class="form-group">
          <label for="publisher">publisher: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter publisher"
            value={publisher}
            name="publisher"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
        <div class="form-group">
          <label for="name">Description: </label>
          <textarea
            class="form-control"
            type="description"
            rows="5"
            placeholder="Enter description"
            value={description}
            name="description"
            onChange={onchangeModelCurrentAction}
          ></textarea>
        </div>

        <div class="form-group">
          <label for="name">Price: </label>
          <input
            type="price"
            class="form-control"
            placeholder="Enter price (VND)"
            value={price}
            name="price"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>
        <div class="form-group">
          <label for="amount">Amount: </label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter amount"
            value={amount}
            name="amount"
            onChange={onchangeModelCurrentAction}
          ></input>
        </div>

        <label>Is active: </label>
        <select
          name="is_active"
          class="form-control"
          value={is_active}
          onChange={onchangeModelCurrentAction}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>

        <div class="form-group">
          <i style={{ color: "red" }}>{successStatus}</i>
        </div>
      </Modal>

      {/* active  */}
      <Modal
        title="Update active"
        open={isModalDeleteVisible}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>
          ARE YOU SURE TO {modelCurrentAction.isActive ? "UNACTIVE" : "ACTIVE"}
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
          <label for="name">Title: </label>
          <input
            type="text"
            readonly
            class="form-control"
            id="title"
            value={modelCurrentAction.title}
            disabled
          ></input>
        </div>
      </Modal>
      <div className="tour-utilities">
        <div className="btn-add-tour" onClick={showAddModal}>
          <div className="left">
            <div className="percentage positive">
              <AddCircleIcon />
            </div>
            <BookmarksIcon
              className="icon"
              style={{
                color: "green",
                backgroundColor: "rgba(0, 128, 0, 0.2)",
              }}
            />
          </div>
          <div className="right">
            <span className="counter">Add new</span>
          </div>
        </div>
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
      <div className="tour-table-container">
        <Table
          className="tour-table"
          scroll={{
            x: 1200,
          }}
          columns={columns}
          dataSource={books}
        />
      </div>
    </>
  );
};

export default BookManager;
