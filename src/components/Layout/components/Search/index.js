import { useState, useEffect, useRef } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import HeadlessTippy from '@tippyjs/react/headless';
import { Wrapper as Popperwapper } from "../../../Popper";
import BookItem from "../BookItem";
import bookApi from "../../../../api/bookApi";

const cx = classNames.bind(styles);
function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [show, setShow] = useState(true);

  const inputRef = useRef();

  const handleSearch = () => {
    setShow(() => true);
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    bookApi.search(searchValue.trim())
    .then(res => setSearchResult(res.data))
  };


  const handleHideResult = () => {
    setShow(false);
    setSearchResult([])
  }

  return (
    <HeadlessTippy
      interactive
      visible={show && searchResult.length>0}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex="-1" {...attrs}>
          <Popperwapper>
            <span className={cx("search-title")}>Search result</span>
            {searchResult.map((result, index) => (
              <BookItem data={result} key={index} />
            ))}
          </Popperwapper>
        </div>
      )}
      onClickOutside={handleHideResult}
    >
      <div className={cx("search")}>
        <input
          ref={inputRef}
          value={searchValue}
          placeholder="Seacrch book..."
          spellCheck={false}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {!!searchValue && (
          <button
            className={cx("clear")}
            onClick={() => {
              setSearchValue("");
              inputRef.current.focus();
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}

        <button className={cx("search-btn")} onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
