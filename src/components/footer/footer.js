import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer__wrap}>
      <div className={styles.footer__wrap__content}>
        <div className="footer_footer__XXj-R">
          <nav>
            <a
              href="https://frontdevpark.tistory.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Blog
            </a>
            |
            <a
              href="https://github.com/bp4sp4/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </nav>
          <p>
            <span>Copyright 2024. SangHun. All Rights Reserved.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
