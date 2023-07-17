import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react/headless";
import {
  faUser,
  faCartShopping,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import Button from "../../../Button";
import styles from "./Header.module.scss";
import images from "../../../../assets/images";
import { Wrapper as Popperwapper } from "../../../Popper";
import Search from "../Search";
import config from "../../../../config";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useContext } from "react";
import routes from "../../../../config/routes";

const cx = classNames.bind(styles);
function Header() {
  const {
    authState: { authLoading, isAuthenticated, role },
  } = useContext(AuthContext);

  const currentUser = isAuthenticated;
  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("logo")}>
          <Link to={config.routes.home}>
            <img src={images.logo} alt="logo" width="120px" />
          </Link>
        </div>
        <Search />
        <div className={cx("actions")}>
          {currentUser ? (
            <>
              <Tippy
                hideOnClick={false}
                interactive
                placement="bottom-end"
                render={(attrs) => (
                  <div className={cx("menu-items")} tabIndex="-1" {...attrs}>
                    <Popperwapper>
                      <Link
                        className={cx("menu-item")}
                        to={config.routes.profile}
                      >
                        My profile
                      </Link>
                      <Link className={cx("menu-item")} to="/logout">
                        <span>Log out</span>
                        <FontAwesomeIcon
                          className={cx("icon-logout")}
                          icon={faRightFromBracket}
                        />
                      </Link>
                    </Popperwapper>
                  </div>
                )}
              >
                <button className={cx("more-btn")}>
                  <FontAwesomeIcon icon={faUser} />
                </button>
              </Tippy>
              <Link to={routes.cart}>
                <button className={cx("action-btn")}>
                  <FontAwesomeIcon icon={faCartShopping} />
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/sign-in"} className={cx("btn-login")}>
                <Button primary small>
                  Login
                </Button>
              </Link>
              <Link to={"/sign-up"} className={cx("btn-register")}>
                <Button outline small>
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
