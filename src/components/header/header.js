import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header__wrap}>
      <div className={styles.header__wrap__nav}>
        <Link to="/">
          <h3>감정있는 GPT</h3>
        </Link>
      </div>
      <div className={styles.header__wrap__nav}>
        <Link to="/imagegpt/imagegpt">
          <h3>이미지</h3>
        </Link>
      </div>
    </header>
  );
};

export default Header;
