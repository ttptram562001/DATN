import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./BookTypeDetail.module.scss";
import BookItem from "../../components/BookItem";
import bookApi from "../../api/bookApi";

const cx = classNames.bind(styles);
function BookTypeDetail() {
  const id = useParams().id;
  const [books, setBooks] = useState([]);

  useEffect(() => {
    bookApi.getBooksByBookTypeDetail(id).then((res) => setBooks(res.data));
  }, []);

  return (
    <div className={cx("wrapper")}>
      {books.map((book) => (
        <BookItem book={book} key={book.id}/>
      ))}
    </div>
  );
}

export default BookTypeDetail;
