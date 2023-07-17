import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { useEffect, useState } from "react";
import BookItem from "../../components/BookItem";
import bookApi from "../../api/bookApi";

const cx = classNames.bind(styles);
function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    bookApi.getAll().then((res) => setBooks(res.data));

  }, []);

  return (
    <div className={cx("wrapper")}>
      {books.map((book) => book.active && (
        <BookItem book={book} key={book.id} />
      ))}
    </div>
  );
}

export default Home;
