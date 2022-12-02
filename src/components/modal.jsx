import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine, RiFileChartLine } from "react-icons/ri";
import { FiDownload, FiMaximize } from "react-icons/fi";
import { MdOutlineClose, MdCached, MdZoomIn, MdZoomOut } from "react-icons/md";
import classNames from "classnames";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const Modal = ({ setIsOpen }) => {
  const handle = useFullScreenHandle();

  return (
    <>
      <div className={styles.darkBG}>
        <div className={styles.toolbarContainer}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.FileIcon}>
                <RiFileChartLine style={{ color: "#fff", fontSize: "20px" }} />
              </span>

              <span className={styles.topFileName}>Sales-dashboard.png</span>
            </div>
            <div className={styles.toolbarRight}>
              <span className={styles.rightBtns} onClick={handle.enter}>
                <FiMaximize style={{ color: "#fff", fontSize: "20px" }} />
              </span>
              <span className={styles.rightBtns}>
                <a href='./sample.jpg' download='my_file.jpg'>
                  <FiDownload style={{ color: "#fff", fontSize: "20px" }} />
                </a>
              </span>
              <span
                className={styles.rightBtns}
                onClick={() => setIsOpen(false)}
              >
                {" "}
                <RiCloseLine style={{ color: "#fff", fontSize: "20px" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <FullScreen handle={handle}>
              <img src="./sample.jpg"></img>
            </FullScreen>
          </div>
        </div>
        <div className={classNames(styles.lowerButtonsSection)}>
          <span className={styles.lowerBtns}>
            <MdCached style={{ color: "#fff", fontSize: "20px" }} />
          </span>
          <span className={styles.lowerBtns}>
            {" "}
            <MdZoomOut style={{ color: "#fff", fontSize: "20px" }} />
          </span>
          <span className={styles.lowerBtns}>
            <MdZoomIn style={{ color: "#fff", fontSize: "20px" }} />
          </span>
          <span
            className={styles.lowerBtns}
            style={{ color: "#fff", fontSize: "12px" }}
          >
            Reset
          </span>
        </div>
      </div>
    </>
  );
};

export default Modal;

{
  /* <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button> */
}
{
  /* <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Modal</h5>
          </div> */
}
