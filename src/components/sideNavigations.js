import React from "react";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";
import styles from "./Modal.module.css";

const sideNavigations = ({
  handleBeforeFile,
  handleNextFile,
  currentFileIndex,
  fileLength,
}) => {
  return (
    <>
      {currentFileIndex !== 0 && (
        <MdOutlineNavigateBefore
          className={styles.navigatePrevious}
          style={{ color: "#fff", fontSize: "30px" }}
          onClick={handleBeforeFile}
        />
      )}
      {currentFileIndex !== fileLength - 1 && (
        <MdOutlineNavigateNext
          className={styles.navigateNext}
          style={{ color: "#fff", fontSize: "30px" }}
          onClick={handleNextFile}
        />
      )}
    </>
  );
};

export default sideNavigations;
