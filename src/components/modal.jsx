import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine, RiFileChartLine } from "react-icons/ri";
import { FiDownload, FiMaximize } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)}>
        <div className={styles.toolbarContainer}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.FileIcon}>
                <RiFileChartLine style={{ color: "#fff", fontSize: "20px" }} />
              </span>

              <span className={styles.topFileName}>Sales-dashboard.png</span>
            </div>
            <div className={styles.toolbarRight}>
              <div className={styles.rightButtons}>
                <span>
                  <FiMaximize style={{ color: "#fff", fontSize: "20px" }} />
                </span>
                <span>
                  <FiDownload style={{ color: "#fff", fontSize: "20px" }} />
                </span>{" "}
                |
                <span>
                  <MdOutlineClose style={{ color: "#fff", fontSize: "20px" }} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Modal</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          {/* <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                Delete
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Modal;
