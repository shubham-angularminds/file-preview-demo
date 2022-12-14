import React, { useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import FilePreview from "./component/filePreview";
import SampleImage from "./sample.jpg";
import SamplePdf from "./sample2.pdf";
import SampleExcel from "./sample.xlsx";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const files = [
    {
      location: SampleImage,
      mimeType: "image",
      name: "sample-image1.jpg",
    },
    {
      // location: SamplePdf,
      location: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
      mimeType: "pdf",
      name: "sample-pdf.pdf",
    },
    {
      location: SampleExcel,
      mimeType: "excel",
      name: "sample-excel.xlsx",
    },
  ];

  const [currentFileIndex, setCurrentFileIndex] = useState(0);

  const handleNextFile = () => {
    setCurrentFileIndex(currentFileIndex + 1);
  };

  const handleBeforeFile = () => {
    setCurrentFileIndex(currentFileIndex - 1);
  };

  const fileLength = files.length;

  return (
    <>
      <div>
        <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
          Show File
        </button>
        {isOpen && (
          <FilePreview
            files={files[currentFileIndex]}
            fileLength={fileLength}
            currentFileIndex={currentFileIndex}
            handleNextFile={handleNextFile}
            handleBeforeFile={handleBeforeFile}
            setCurrentFileIndex={setCurrentFileIndex}
            // show={}
            handleClose={setIsOpen}
          />
        )}
      </div>
    </>
  );
}

export default App;
