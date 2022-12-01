import React from "react";
import styles from "./module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Dialog</h5>
          </div>
          <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default Modal;
