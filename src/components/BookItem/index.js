import classNames from "classnames/bind";
import styles from "./BookItem.module.scss";

import { Rate } from "antd";
import { Link } from "react-router-dom";
import routes from "../../config/routes";
import { url } from "../../api/constants";

const cx = classNames.bind(styles);

function BookItem({ book }) {
  const srcImg =`${url}/file/images/${book.image}`
  console.log(book)
  const handleCalRate = () => {
    let sum = 0;
    if (book.rates!== undefined && book.rates !== null) {
      for (var rate of book.rates) {
        sum += rate.amount;
      }
      return sum / book.rates.length;
    }

    return sum;
  };
  return (
    <Link to={routes.detailBook.replace(":id", book.id)}>
      <div className={cx("wrapper")}>
        <div className={cx("img-box")}>
          <img className={cx("book-image")} src={srcImg} alt="" />
        </div>
        <div className={cx("book-info")}>
          <Rate allowHalf defaultValue={handleCalRate} />
          <div className={cx("book-author")}>By: {book.author}</div>
          <div className={cx("book-name")}>{book.title}</div>
          <div className={cx("book-price")}>{book.price}</div>
        </div>
      </div>
    </Link>
  );
}

export default BookItem;
