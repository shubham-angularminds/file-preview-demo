import React, { useState, useRef } from "react";
import styles from "./Modal.module.css";
import { RiCloseLine, RiFileChartLine } from "react-icons/ri";
import { FiDownload, FiMaximize } from "react-icons/fi";
import {
  MdCached,
  MdZoomIn,
  MdZoomOut,
  MdOutlineNavigateNext,
  MdOutlineNavigateBefore,
  MdOutlineArrowUpward,
  MdOutlineArrowDownward,
} from "react-icons/md";
import classNames from "classnames";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import SamplePdf from "../sample2.pdf";
import { useEffect } from "react";
import { read, utils, writeFileXLSX } from "xlsx";

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
  const [height, setHeight] = useState(640);
  const [width, setWidth] = useState(1375);
  const [pdfScale, setPdfScale] = useState(1);

  const imageRef = useRef({ clientHeight: height, clientWidth: width });

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => {
    if (file?.fileType === "image") {
      const height = imageRef?.current?.clientHeight;
      const width = imageRef?.current?.clientWidth;
      setHeight(height + 100);
      setWidth(width + 100);
    }
    if (file?.fileType === "pdf") {
      setPdfScale(pdfScale + 0.25);
    }
  };

  const handleZoomOut = () => {
    if (file?.fileType === "image") {
      const height = imageRef?.current?.clientHeight;
      const width = imageRef?.current?.clientWidth;
      setHeight(height - 100);
      setWidth(width - 100);
    }
    if (file?.fileType === "pdf" && pdfScale !== 1) {
      setPdfScale(pdfScale - 0.25);
    }
  };

  const handleReset = () => {
    setHeight(640);
    setWidth(1375);
    setRotation(0);
    setPageNumber(1);
    setPdfScale(1);
  };

  useEffect(() => {
    handleReset();
  }, [currentFileIndex]);

  const imageStyle = {
    height: height,
    width: width,
    transform: `rotate(${rotation}deg)`,
  };

  const rotate = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  const lowerButtonClass = classNames({
    [styles.lowerButtonsSectionImage]: file.fileType === "image",
    [styles.lowerButtonsSectionPdf]: file.fileType === "pdf",
  });

  const handleNextPage = () => {
    if (pageNumber !== numPages) {
      setPageNumber((pageNo) => pageNo + 1);
    }
  };

  const handlePrevPage = () => {
    if (pageNumber !== 1) {
      setPageNumber((pageNo) => pageNo - 1);
    }
  };

  const enableFullScreen = () => {
    setFullScreenEnabled(true);
    handle.enter();
  };

  //Excel
  useEffect(() => {
    if (file?.fileType === "excel") {
      (async () => {
        const f = await (await fetch(file.file)).arrayBuffer();
        const wb = read(f); // parse the array buffer
        const ws = wb.Sheets[wb.SheetNames[0]]; // get the first worksheet
        const data = utils.sheet_to_json(ws); // generate objects
        console.log("excel data: ", data);
      })();
    }
  }, [currentFileIndex]);

  return (
    <>
      <div className={styles.darkBG}>
        <div className={styles.toolbarContainer}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.FileIcon}>
                <RiFileChartLine style={{ color: "#fff", fontSize: "20px" }} />
              </span>
              <span className={styles.topFileName}>{file.fileName}</span>
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

      {
        //Modal start
      }
      <div className={styles.centered}>
        <div
          className={
            file.fileType === "image" ? styles.imageModal : styles.pdfModal
          }
        >
          <div className={styles.modalContent}>
            <FullScreen handle={handle}>
              {file?.fileType === "image" ? (
                <img
                  style={fullScreenEnabled ? {} : imageStyle}
                  src="./sample.jpg"
                  ref={imageRef}
                ></img>
              ) : (
                <div className={styles.pdfRender}>
                  <Document
                    file={file.file}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} scale={pdfScale} />
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
        {
          //lower Buttons
        }
        <div className={lowerButtonClass}>
          {file.fileType === "pdf" && (
            <span style={{ marginRight: "10px" }}>
              <MdOutlineArrowUpward
                style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
                onClick={handleNextPage}
              />
              <MdOutlineArrowDownward
                style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
                onClick={handlePrevPage}
              />
            </span>
          )}
          {file.fileType === "pdf" && (
            <span style={{ marginRight: "10px" }}>
              Page{" "}
              <span>
                <input
                  size="xs"
                  value={pageNumber}
                  type="text"
                  inputmode="numeric"
                  onChange={(e) => {
                    setPageNumber(Number(e.target.value));
                  }}
                  className={styles.pageInput}
                  onKeyPress={(e) => {}}
                />{" "}
              </span>
              of {numPages}
            </span>
          )}
          {file.fileType === "image" && (
            <span className={styles.lowerBtns} style={{ marginRight: "10px" }}>
              <MdCached
                style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
                onClick={rotate}
              />
            </span>
          )}
          <span className={styles.lowerBtns} style={{ marginRight: "2px" }}>
            {" "}
            <MdZoomOut
              style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
              onClick={handleZoomOut}
            />
          </span>
          <span className={styles.lowerBtns} style={{ marginRight: "10px" }}>
            <MdZoomIn
              style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
              onClick={handleZoomIn}
            />
          </span>
          <span
            className={styles.lowerBtns}
            style={{ color: "#fff", fontSize: "12px", cursor: "pointer" }}
            onClick={handleReset}
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
