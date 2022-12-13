import React from 'react';
import styles from "./Modal.module.css";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import ExcelTable from './ExcelTable';

// Define a new component for the file view
const FileView = ({ file, height, width, rotation, pdfScale, pageNumber, imageRef, onDocumentLoadSuccess }) => {

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


export default FileView;


