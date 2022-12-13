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
import SideNavigations from "./sideNavigations";

const FilePreview = ({
  handleClose,
  files,
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
  const [excelData, setExcelData] = useState([]);
  const [totalSheets, setTotalSheets] = useState(null);
  const [allSheets, setAllSheets] = useState([]);
  const [sheetIndex, setSheetIndex] = useState(0);

  const imageRef = useRef({ clientHeight: height, clientWidth: width });

  const { mimeType, location, name } = files;

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

  console.log("image styles : ", imageStyle);

  const rotate = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  const lowerButtonClass = classNames({
    [styles.lowerButtonsSectionImage]: mimeType === "image",
    [styles.lowerButtonsSectionPdf]: mimeType === "pdf",
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

  const handleFullScrenChange = useCallback((state) => {
    console.log("Screen 1 went to", state);
    state ? setFullScreenEnabled(true) : setFullScreenEnabled(false);
  }, []);

  //Excel
  useEffect(() => {
    if (mimeType === "excel") {
      // const workbook = read(file?.file, { type: "binary" });
      // const sheet = workbook.Sheets[workbook.SheetNames[0]];
      // const data = utils.sheet_to_json(sheet, { header: 1 });
      // setExcelData(data);
      (async () => {
        const f = await (await fetch(location)).arrayBuffer();
        const wb = read(f); // parse the array buffer
        const numSheets = wb.SheetNames.length;
        setAllSheets(wb.SheetNames);
        setTotalSheets(numSheets);
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
    <>
      {
        //todo seperate component
      }
      <div className={styles.darkBG}>
        <div className={styles.toolbarContainer}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <span className={styles.FileIcon}>
                <RiFileChartLine style={{ color: "#fff", fontSize: "20px" }} />
              </span>
              <span className={styles.topFileName}>{name}</span>
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
                  handleClose(false);
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
        //todo seperate component
      }
      <div className={styles.centered}>
        <div
          className={mimeType === "image" ? styles.imageModal : styles.pdfModal}
        >
          <div className={styles.modalContent}>
            <FullScreen handle={handle} onChange={handleFullScrenChange}>
              {mimeType === "image" ? (
                <div className="image-container">
                  <img
                    style={fullScreenEnabled ? {} : imageStyle}
                    alt="file-content"
                    src="./sample.jpg"
                    ref={imageRef}
                  ></img>
                </div>
              ) : mimeType === "pdf" ? (
                // <ExcelTable  file={file.file}/>

                <div className={styles.pdfRender}>
                  <Document
                    file={location}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} scale={pdfScale} />
                  </Document>
                  <p style={{ color: "#000" }}>
                    Page {pageNumber} of {numPages}
                  </p>
                </div>
              ) : (
                // <Spreadsheet data={grid} readOnly={true} /
                <div className={styles.tableContainer}>
                  <table className={styles.excelTable}>
                    <thead>
                      <tr>
                        {excelData[0] &&
                          excelData[0].map((header, index) => (
                            <>
                              <th key={index}>{header}</th>
                            </>
                          ))}
                      </tr>
                    </thead>
                    <tbody>
                      {excelData?.slice(1).map((row, index) => (
                        <tr key={index}>
                          {row.map((cell, index) => (
                            <td key={index}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <>
                    <div
                      className={styles.sheetButtonContainer}
                      id="excel-sheet-buttons"
                    >
                      {allSheets?.map((sheet, index) => (
                        <button
                          type="button"
                          className={styles.button}
                          onClick={() => selectSheet(index)}
                        >
                          {sheet}
                        </button>
                      ))}
                    </div>
                  </>
                </div>
              )}
            </FullScreen>
          </div>
        </div>

        {
          // lower Buttons
          //todo seperate component
        }
        <div className={lowerButtonClass}>
          {mimeType === "pdf" && (
            <span style={{ marginRight: "10px" }}>
              <MdOutlineArrowUpward
                style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
                onClick={handlePrevPage}
              />
              <MdOutlineArrowDownward
                style={{ color: "#fff", fontSize: "20px", cursor: "pointer" }}
                onClick={handleNextPage}
              />
            </span>
          )}
          {mimeType === "pdf" && (
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
          {mimeType === "image" && (
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
      <SideNavigations
        handleBeforeFile={handleBeforeFile}
        handleNextFile={handleNextFile}
        currentFileIndex={currentFileIndex}
        fileLength={fileLength}
      />
    </>
  );
};

export default FilePreview;
