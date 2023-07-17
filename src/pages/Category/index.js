import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Category.module.scss";
import bookApi from "../../api/bookApi";
import { Link } from "react-router-dom";
import routes from "../../config/routes";

const cx = classNames.bind(styles);

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    bookApi.getBookType().then((res) => setCategories(res.data));
  }, []);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        {categories.map((cate) => (
          <div className={cx("category")} key={cate.id}>
            <Link to={routes.bookType.replace(":id", cate.id)}>
              <span>{cate.name}</span>
            </Link>
            <ul>
              {cate.bookTypeDetails.map((cateDetail) => (
                <Link to={routes.bookTypeDetail.replace(":id", cateDetail.id)}>
                  <li key={cateDetail.id}>{cateDetail.name}</li>
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
