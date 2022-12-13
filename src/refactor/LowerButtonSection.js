import React from "react";
import styles from "./Modal.module.css";
import {
  MdOutlineNavigateNext
} from "react-icons/md";
import classNames from "classnames";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { read, utils, writeFileXLSX } from "xlsx";
import UpperButtonSection from "./UpperButtonSection";
import FileView from './fileView'; 


// Define a new component for the lower button section
const LowerButtonSection = ({
  file,
  handleNextPage,
  handleBeforePage,
  pageNumber,
  numPages
}) => {
  const lowerButtonClass = classNames({
    [styles.lowerButtonsSectionImage]: file.fileType === "image",
    [styles.lowerButtonsSectionPdf]: file.fileType === "pdf",
  });

  return (
    <div className={lowerButtonClass}>
      <div className={styles.buttonsContainer}>
        <button
          onClick={handleNextPage}
          disabled={file.fileType === "image" || pageNumber >= numPages}
          className={styles.button}
        >
          <MdOutlineNavigateNext className={styles.icon} />
        </button>
        <button
          onClick={handleBeforePage}
          disabled={file.fileType === "image" || pageNumber <= 1}
        />
      </div>
    </div>
  );
};

export default LowerButtonSection;
