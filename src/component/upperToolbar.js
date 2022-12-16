import React from "react";
import styles from "./upperToolbar.module.css";
import { RiCloseLine, RiFileChartLine } from "react-icons/ri";
import { FiDownload, FiMaximize } from "react-icons/fi";

const upperToolbar = ({
  name,
  location,
  enableFullScreen,
  handleClose,
  setCurrentFileIndex,
}) => {
  return (
    <>
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
              <a href={location} download={name}>
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
    </>
  );
};

export default upperToolbar;
