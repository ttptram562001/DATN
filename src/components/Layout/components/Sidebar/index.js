import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBookOpenReader,
  faTableCellsLarge
} from "@fortawesome/free-solid-svg-icons";
import Menu, { MenuItem } from "./Menu";
import config from "../../../../config";
import SuggestedBook from "../../../SuggestedBook/SuggestedBook";
const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx("wrapper")}>
      <Menu>
        <MenuItem
          title="Home"
          to={config.routes.home}
          icon={<FontAwesomeIcon icon={faHouse} />}
        />
        {/* <MenuItem
          title="Best Selling"
          to={config.routes.bestSelling}
          icon={<FontAwesomeIcon icon={faBookOpenReader} />}
        /> */}
        <MenuItem
          title="Categories"
          to={config.routes.category}
          icon={<FontAwesomeIcon icon={faTableCellsLarge} />}
        />
      </Menu>
      <SuggestedBook label="Suggested books" />
    </aside>
  );
}

export default Sidebar;
