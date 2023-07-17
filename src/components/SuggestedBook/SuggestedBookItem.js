import classNames from "classnames/bind";
import styles from "./SuggestedBook.module.scss";
import { url } from "../../api/constants";

const cx = classNames.bind(styles);
function SuggestedBookItem(book) {
  console.log(book)
  return (
    <div className={cx("book-item")}>
      <img
        className={cx("avatar")}
        src={`${url}/file/images/${book.value.image}`}
        alt=""
      />
      <div className={cx("item-info")}>
        <strong className={cx("book-name")}>{book.value.title}</strong>
        <p className={cx("book-price")}> {book.value.price}</p>
      </div>
    </div>
  );
}

export default SuggestedBookItem;
