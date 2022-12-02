import React, { useState } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine, RiFileChartLine } from "react-icons/ri";
import { FiDownload, FiMaximize } from "react-icons/fi";
import {
  MdCached,
  MdZoomIn,
  MdZoomOut,
  MdOutlineNavigateNext,
  MdOutlineNavigateBefore,
} from "react-icons/md";
import classNames from "classnames";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import SamplePdf from "../sample2.pdf";

const Modal = ({
  setIsOpen,
  file,
  handleNextFile,
  handleBeforeFile,
  fileLength,
  currentFileIndex,
  setCurrentFileIndex,
}) => {
  const handle = useFullScreenHandle();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <div className={styles.darkBG}>
        <div className={styles.toolbarContainer}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.FileIcon}>
                <RiFileChartLine style={{ color: "#fff", fontSize: "20px" }} />
              </span>
              Reset
              {}
              <span className={styles.topFileName}>{file.fileName}</span>
            </div>
            <div className={styles.toolbarRight}>
              <span className={styles.rightBtns} onClick={handle.enter}>
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
                  setIsOpen(false);
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
      <div className={styles.centered}>
        <div className={file.fileType === 'image' ? styles.imageModal: styles.pdfModal}>
          <div className={styles.modalContent}>
            <FullScreen handle={handle}>
              {file?.fileType === "image" ? (
                <img src="./sample.jpg"></img>
              ) : (
                <div className={styles.pdfRender}>
                  <Document
                    file={file.file}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} />
                  </Document>
                  <p style={{ color: "#000" }}>
                    Page {pageNumber} of {numPages}
                  </p>
                </div>
              )}
            </FullScreen>
          </div>
          <div className={styles.sliderButtons}>
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
