import classNames from "classnames/bind";
import styles from "./BookItem.module.scss";
import { API_URL } from "../../../../contexts/constants";
import {Link} from "react-router-dom"
import routes from "../../../../config/routes"
const cx = classNames.bind(styles);

function BookItem({ data }) {
  const url = API_URL + "/file/images/" + data.image;
  console.log(url);
  return (
    <>
      <Link to={routes.detailBook.replace(":id", data.id)}>
        <div className={cx("wrapper")}>
          <div className={cx("image")}>
            <img src={url} alt="" width={30} />
          </div>
          <div>{data.title}</div>
        </div>
      </Link>
    </>
  );
}

export default BookItem;
