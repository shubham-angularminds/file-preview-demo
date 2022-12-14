import React, { useState, useRef, useCallback } from "react";
import styles from "./filePreview.module.css";
import { useFullScreenHandle } from "react-full-screen";
import { useEffect } from "react";
import { read, utils } from "xlsx";
import SideNavigations from "./sideNavigations";
import ModalContent from "./modalContent";
import UpperToolbar from "./upperToolbar";
import LowerButtons from "./lowerButtons";

const FilePreview = ({ handleClose, files, size }) => {
  const handle = useFullScreenHandle();
  const [height, setHeight] = useState(640);
  const [width, setWidth] = useState(1375);
  const [pdfScale, setPdfScale] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [fullScreenEnabled, setFullScreenEnabled] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [allSheets, setAllSheets] = useState([]);
  const [sheetIndex, setSheetIndex] = useState(0);

  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const handleNextFile = () => {
    setCurrentFileIndex(currentFileIndex + 1);
  };

  const handlePreviousFile = () => {
    setCurrentFileIndex(currentFileIndex - 1);
  };

  const fileLength = files.length;

  const { mimeType, location, name } = files[currentFileIndex];

  const imageRef = useRef({ clientHeight: height, clientWidth: width });

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleZoomIn = () => {
    if (mimeType === "image") {
      const height = imageRef?.current?.clientHeight;
      const width = imageRef?.current?.clientWidth;
      setHeight(height + 100);
      setWidth(width + 100);
    }
    if (mimeType === "pdf") {
      setPdfScale(pdfScale + 0.25);
    }
  };

  const handleZoomOut = () => {
    if (mimeType === "image") {
      const height = imageRef?.current?.clientHeight;
      const width = imageRef?.current?.clientWidth;
      setHeight(height - 100);
      setWidth(width - 100);
    }
    if (mimeType === "pdf" && pdfScale !== 1) {
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

  const handleFullScrenChange = useCallback((state) => {
    state ? setFullScreenEnabled(true) : setFullScreenEnabled(false);
  }, []);

  //Get Excel file Data
  useEffect(() => {
    if (mimeType === "excel") {
      (async () => {
        const f = await (
          await fetch(location, {
            "Access-Control-Allow-Origin": "*",
          })
        ).arrayBuffer();
        const wb = read(f); // parse the array buffer
        setAllSheets(wb.SheetNames);
        const ws = wb.Sheets[wb.SheetNames[sheetIndex]]; // get the first worksheet
        const data = utils.sheet_to_json(ws, { header: 1 }); // generate objects

        console.log("excel data: ", data);
        if (data[0][0] === undefined) {
          data[0].fill("index", 0, 1);
        }
        setExcelData(data);
      })();
    }
  }, [location, mimeType, sheetIndex]);

  const selectSheet = (sheet) => {
    setSheetIndex(sheet);
  };

  return (
    <div
      className={
        size === "md" ? styles.mdbg : size === "sm" ? styles.smbg : styles.lgbg
      }
    >
      <UpperToolbar
        name={name}
        location={location}
        enableFullScreen={enableFullScreen}
        handleClose={handleClose}
        setCurrentFileIndex={setCurrentFileIndex}
      />

      <div className={styles.centered}>
        <ModalContent
          mimeType={mimeType}
          handle={handle}
          handleFullScrenChange={handleFullScrenChange}
          fullScreenEnabled={fullScreenEnabled}
          imageStyle={imageStyle}
          imageRef={imageRef}
          location={location}
          pageNumber={pageNumber}
          numPages={numPages}
          pdfScale={pdfScale}
          onDocumentLoadSuccess={onDocumentLoadSuccess}
          allSheets={allSheets}
          excelData={excelData}
          selectSheet={selectSheet}
        />

        <LowerButtons
          mimeType={mimeType}
          handleZoomIn={handleZoomIn}
          handleZoomOut={handleZoomOut}
          rotate={rotate}
          handleReset={handleReset}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          numPages={numPages}
        />
      </div>
      <SideNavigations
        handlePreviousFile={handlePreviousFile}
        handleNextFile={handleNextFile}
        currentFileIndex={currentFileIndex}
        fileLength={fileLength}
      />
    </div>
  );
};

export default FilePreview;
