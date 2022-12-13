import React, { useState, useRef, useEffect } from "react";
import styles from "./Modal.module.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import UpperButtonSection from "./UpperButtonSection";
import LowerButtonSection from "./LowerButtonSection";
import FileView from "./fileView";

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
          fullScreenEnabled={fullScreenEnabled}
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
          imageRef={imageRef}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
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
        />
      </div>
    </FullScreen>
  );
};

export default Modal;
