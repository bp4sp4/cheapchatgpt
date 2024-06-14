import React from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <div className={styles.leftNav}>
          <Link to="/" className={styles.logo}>
            타이틀
          </Link>
          <Link to="/" className={styles.navLink}>
            GPT 놀이터
          </Link>
          <Link to="/imagegpt/imagegpt" className={styles.navLink}>
            이미지
          </Link>
          <Link to="vision/vision" className={styles.navLink}>
            비전
          </Link>
        </div>
        <nav className={styles.rightNav}>
          <Link to="/login" className={styles.navLink}>
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
