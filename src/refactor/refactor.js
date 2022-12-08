import React, { useState, useRef, useCallback } from "react";
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
import { useEffect } from "react";
import { read, utils, writeFileXLSX } from "xlsx";

// Define a new component for the file view
const FileView = ({ file, height, width, rotation, pdfScale, pageNumber, handleNextPage, handleBeforePage, numPages, handleZoomIn, handleZoomOut, handleReset, rotate }) => {
  if (file.fileType === "image") {
    return (
      <img
        ref={imageRef}
        src={file.fileUrl}
        alt={file.fileName}
        className={styles.fileView}
        style={{ height: height, width: width, transform: `rotate(${rotation}deg)` }}
      />
    );
  }

  if (file.fileType === "pdf") {
    return (
      <Document
        file={file.fileUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className={styles.fileView}
      >
        <Page pageNumber={pageNumber} scale={pdfScale} />
      </Document>
    );
  }

  if (file.fileType === "excel") {
    return (
      <ExcelTable file={file} />
    );
  }
};

// Define a new component for the lower button section
const LowerButtonSection = ({
  file,
  handleNextPage,
  handleBeforePage,
  pageNumber,
  numPages,
  handleZoomIn,
  handleZoomOut,
  handleReset,
  rotate,
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
}) => {
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleNextFile = () => {
    setCurrentFileIndex((currentFileIndex + 1) % fileLength);
  };

  const handleBeforeFile = () => {
    let newIndex = currentFileIndex - 1;
    if (newIndex < 0) {
      newIndex = fileLength - 1;
    }
    setCurrentFileIndex(newIndex);
  };

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
      <button
        onClick={handleCloseModal}
        className={styles.button}
      >
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
      <button
        onClick={toggleFullScreen}
        className={styles.button}
      >
        <FiMaximize className={styles.icon} />
      </button>
      {fullScreenEnabled && (
        <button
          onClick={handleExitFullScreen}
          className={styles.button}
        >
          <FiMaximize className={styles.icon} />
        </button>
      )}
    </div>
  );
};

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
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);

  const imageRef = useRef({ clientHeight: height, clientWidth: width });

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
  
  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };
  
  const handleBeforePage = () => {
    setPageNumber(pageNumber - 1);
  };
  
  return (
    <FullScreen handle={handle}>
      <div className={styles.modal}>
        <UpperButtonSection
          setIsOpen={setIsOpen}
          handleNextFile={handleNextFile}
          handleBeforeFile={handleBeforeFile}
          fileLength={fileLength}
          currentFileIndex={currentFileIndex}
          setCurrentFileIndex={setCurrentFileIndex}
          handle={handle}
          setFullScreenEnabled={setFullScreenEnabled}
        />
        <FileView
          file={file}
          height={height}
          width={width}
          rotation={rotation}
          pdfScale={pdfScale}
          pageNumber={pageNumber}
          handleNextPage={handleNextPage}
          handleBeforePage={handleBeforePage}
          numPages={numPages}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleReset={handleReset}
          rotate={rotate}
        />
        <LowerButtonSection
          file={file}
          handleNextPage={handleNextPage}
          handleBeforePage={handleBeforePage}
          pageNumber={pageNumber}
          numPages={numPages}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          handleReset={handleReset}
          rotate={rotate}
        />
      </div>
    </FullScreen>
  );
  