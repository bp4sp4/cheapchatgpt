import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.leftNav}>
          <Link to="/" className={styles.logo}>
            GPT Play
          </Link>
          <Link to="/" className={styles.navLink}>
            GPT 놀이터
          </Link>
          <Link to="/imagegpt/imagegpt" className={styles.navLink}>
            이미지
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
