import React from "react";
import styles from "./upperToolbar.module.css";
import { RiCloseLine, RiFileChartLine } from "react-icons/ri";
import { FiDownload, FiMaximize } from "react-icons/fi";

const upperToolbar = ({
  name,
  enableFullScreen,
  handleClose,
  setCurrentFileIndex,
}) => {
  return (
    <div>
      <div className={styles.darkBG}>
        <div className={styles.toolbarContainer}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.FileIcon}>
                <RiFileChartLine style={{ color: "#fff", fontSize: "20px" }} />
              </span>
              <span className={styles.topFileName}>{name}</span>
            </div>
            <div className={styles.toolbarRight}>
              <span className={styles.rightBtns} onClick={enableFullScreen}>
                <FiMaximize style={{ color: "#fff", fontSize: "20px" }} />
              </span>
              <span className={styles.rightBtns}>
                <a href="./sample.jpg" download="my_file.jpg">
                  <FiDownload style={{ color: "#fff", fontSize: "20px" }} />
                </a>
              </span>
              <span
                className={styles.rightBtns}
                onClick={() => {
                  handleClose(false);
                  setCurrentFileIndex(0);
                }}
              >
                {" "}
                <RiCloseLine style={{ color: "#fff", fontSize: "20px" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default upperToolbar;
