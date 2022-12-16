import React from "react";
import {
  MdCached,
  MdZoomIn,
  MdZoomOut,
  MdOutlineArrowUpward,
  MdOutlineArrowDownward,
} from "react-icons/md";
import styles from "./lowerButtons.module.css";
import classNames from "classnames";

const lowerButtons = ({
  mimeType,
  handlePrevPage,
  handleNextPage,
  pageNumber,
  setPageNumber,
  handleZoomIn,
  handleZoomOut,
  handleReset,
  numPages,
  rotate,
}) => {
  const lowerButtonClass = classNames({
    [styles.lowerButtonsSectionImage]: mimeType === "image",
    [styles.lowerButtonsSectionPdf]: mimeType === "pdf",
  });

  return (
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
  );
};

export default lowerButtons;
