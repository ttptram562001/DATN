import classNames from "classnames/bind";
import { Modal, Rate } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faAdd,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import styles from "./DetailBook.module.scss";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import bookApi from "../../api/bookApi";
import cartApi from "../../api/cartApi";
import rateApi from "../../api/rateApi";
import cmtApi from "../../api/cmtApi";
import { AuthContext } from "../../contexts/AuthContext";
import routes from "../../config/routes";
import axiosClient from "../../api/axiosClient";

const cx = classNames.bind(styles);
function DetailBook() {
  const {
    authState: { user },
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [showModalRating, setShowModalRating] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [rateCur, setRateCur] = useState();

  const id = useParams().id;

  const [res, setRes] = useState();

  useEffect(() => {
    bookApi.get(id).then((res) => setRes(res.data));
    console.log(user);
  }, [id]);

  useEffect(() => {
    user &&
      rateApi.getRate(id, user).then((res) => {
        console.log(res.data);
        setRateCur(() => res.data);
      });
  }, []);


  const handleAddToCart = () => {
    console.log(user);
    cartApi.addItemToCart(user, id, amount);
    navigate("/cart");
  };

  const handleRateStore = async (value) => {
    try {
      await rateApi.rateBook(res.id, user, value);
      alert("Đánh giá thành công");
      setRateCur(value);
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCalRate = () => {
    let sum = 0;
    if (res !== undefined && res.rates !== null) {
      for (var rate of res.rates) {
        sum += rate.amount;
      }
      return sum / res.rates.length;
    }

    return sum;
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      const cmt = {
        username: user,
        idBook: res.id,
        content: commentText,
      };
      handleCreateComment(cmt);
      setCommentText("");
    }
  };

  const handleCreateComment = async (data) => {
    await cmtApi.createCmt(data);
    window.location.reload(false);
  };

  const data = {
    amount,
    book: res,
    username: user,
  };

  return (
    res && (
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("book-image")}>
            <img
              src={`http://localhost:8080/file/images/${res.image}`}
              alt=""
            />
          </div>
          <div className={cx("info")}>
            <div className={cx("book-info-main")}>
              <div className={cx("book-name")}>{res.title}</div>
              <Rate
                className={cx("book-rate")}
                allowHalf
                defaultValue={handleCalRate()}
              />
              <div className={cx("book-price")}>{res.price}</div>
            </div>
            <div className={cx("book-info-bonus")}>
              <div className={cx("book-author")}>
                <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} />
                Author: {res.author}
              </div>
              <div className={cx("atPublished")}>
                <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} />
                Xuất bản năm : {res.yearOfPublication}
              </div>
              <div className={cx("publisher")}>
                <FontAwesomeIcon className={cx("icon")} icon={faCaretRight} />
                Nhà xuất bản: {res.publisher}
              </div>
              <div className={cx("description")}>{res.description}</div>
            </div>
            <div className={cx("book-btn")}>
              <div className={cx("quanlity")}>
                <FontAwesomeIcon
                  icon={faMinus}
                  onClick={() => setAmount(amount - 1)}
                />
                <input value={amount} />
                <FontAwesomeIcon
                  icon={faAdd}
                  onClick={() => setAmount(amount + 1)}
                />
              </div>
              <button className={cx("btn-add-cart")} onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <Link
                to={user == null ? "/sign-in" : routes.order}
                state={{ data: [data] }}
              >
                <button className={cx("btn-buy-now")}>BUY NOW</button>
              </Link>
            </div>

            <div className={cx("rate-review")}>
              <span className={cx("title")}>Rating & Reviews</span>
              <div className={cx("content-rating-review")}>
                <div className={cx("avatar")}>
                  <img
                    src="https://img.freepik.com/free-icon/user_318-875902.jpg"
                    alt=""
                  />
                  <div className={cx("username")}>{user}</div>
                </div>
                <div className={cx("rate-review-res")}>
                  <div className={cx("rating")}>
                    <span onClick={() => setShowModalRating(true)}>
                      <Rate defaultValue={rateCur} />
                    </span>
                    <div>Rating this book</div>
                  </div>
                  <button className={cx("btn-review")}>Write a Review</button>
                </div>
              </div>
            </div>
            <div className={cx("all-reviews")}>
              <span className={cx("title")}>Community reviews</span>
              {res.comments.map(
                (comment) =>
                  comment.isActive && (
                    <div className={cx("review")} key={comment.id}>
                      <div className={cx("avatar-of-reviewer")}>
                        <img
                          src="https://img.freepik.com/free-icon/user_318-875902.jpg"
                          alt=""
                        />
                      </div>
                      <div className={cx("review-content")}>
                        <div className={cx("datetime")}>
                          {comment.createdAt}
                        </div>
                        <div className={cx("content-review")}>
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  )
              )}
              <div>
                <input
                  type="text"
                  placeholder="Nhập bình luận..."
                  onChange={(e) => {
                    setCommentText(e.target.value);
                  }}
                  value={commentText}
                  onKeyDown={(e) => handleEnter(e)}
                />
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="rate-modal"
          open={showModalRating}
          onCancel={() => setShowModalRating(false)}
          footer={null}
        >
          <FontAwesomeIcon
            icon={faFaceSmile}
            style={{ fontSize: "70px", color: "#fadb14" }}
          />
          <p className="mt-2 mb-4">Vui lòng đánh giá cửa hàng</p>
          <Rate
            className="icon"
            onChange={(value) => handleRateStore(value)}
          ></Rate>
        </Modal>
      </div>
    )
  );
}

export default DetailBook;
