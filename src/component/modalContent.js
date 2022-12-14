import React from "react";
import { FullScreen } from "react-full-screen";
import styles from "./modalContent.module.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";

const modalContent = ({
  mimeType,
  handle,
  handleFullScrenChange,
  fullScreenEnabled,
  imageStyle,
  imageRef,
  location,
  pageNumber,
  numPages,
  pdfScale,
  onDocumentLoadSuccess,
  allSheets,
  excelData,
  selectSheet
}) => {
  return (
    <div>
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
              <div className={styles.pdfRender}>
                <Document file={location} onLoadSuccess={onDocumentLoadSuccess}>
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
    </div>
  );
};

export default modalContent;
