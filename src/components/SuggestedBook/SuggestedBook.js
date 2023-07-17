import classNames from "classnames/bind";
import styles from "./SuggestedBook.module.scss";
import SuggestedBookItem from "./SuggestedBookItem";
import { useEffect, useState } from "react";
import bookApi from "../../api/bookApi";
const cx = classNames.bind(styles);

function SuggestedBook({ label }) {
  const [list, setList] = useState();
  useEffect(() => {
    bookApi.getTopBook().then((res) => {
      const books = res.data.splice(0, 3);
      setList(books)
    });
  }, []);
  return (
    <div className={cx("wrapper")}>
      <p className={cx("label")}>{label}</p>
      {list && list.map((book, index) => <SuggestedBookItem value={book} key={index}/>)}

  
    </div>
  );
}

export default SuggestedBook;
