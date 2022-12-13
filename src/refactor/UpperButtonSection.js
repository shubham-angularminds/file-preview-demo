import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine, RiFileChartLine } from "react-icons/ri";
import { FiDownload, FiMaximize } from "react-icons/fi";
import {
  MdOutlineNavigateNext,
  MdOutlineNavigateBefore
} from "react-icons/md";

// Define a new component for the upper button section
const UpperButtonSection = ({
  setIsOpen,
  handleNextFile,
  handleBeforeFile,
  fileLength,
  currentFileIndex,
  setCurrentFileIndex,
  handle,
  setFullScreenEnabled,
  fullScreenEnabled
}) => {
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // const handleNextFile = () => {
  //   setCurrentFileIndex((currentFileIndex + 1) % fileLength);
  // };

  // const handleBeforeFile = () => {
  //   let newIndex = currentFileIndex - 1;
  //   if (newIndex < 0) {
  //     newIndex = fileLength - 1;
  //   }
  //   setCurrentFileIndex(newIndex);
  // };

  const toggleFullScreen = () => {
    handle.enter();
    setFullScreenEnabled(true);
  };

  const handleExitFullScreen = () => {
    handle.exit();
    setFullScreenEnabled(false);
  };

  return (
    <div className={styles.upperButtonsSection}>
      <button onClick={handleCloseModal} className={styles.button}>
        <RiCloseLine className={styles.icon} />
      </button>
      <button
        onClick={handleBeforeFile}
        disabled={fileLength === 1}
        className={styles.button}
      >
        <MdOutlineNavigateBefore className={styles.icon} />
      </button>
      <button
        onClick={handleNextFile}
        disabled={fileLength === 1}
        className={styles.button}
      >
        <MdOutlineNavigateNext className={styles.icon} />
      </button>
      <button onClick={toggleFullScreen} className={styles.button}>
        <FiMaximize className={styles.icon} />
      </button>
      {fullScreenEnabled && (
        <button onClick={handleExitFullScreen} className={styles.button}>
          <FiMaximize className={styles.icon} />
        </button>
      )}
    </div>
  );
};

export default UpperButtonSection;
