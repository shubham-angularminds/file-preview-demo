import React, { useState } from "react";
import "./App.css";
import styles from "./App.module.css";
import Modal from "./components/modal";
import SampleImage from "./sample.jpg";
import SamplePdf from "./sample.pdf";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const files = [
    {
      file: SampleImage,
      fileType: "image",
      fileName: "sample-image1.jpg",
    },
    {
      file: SamplePdf,
      fileType: "pdf",
      fileName: "sample-pdf.pdf",
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
          Open Modal
        </button>
        {isOpen && (
          <Modal
            setIsOpen={setIsOpen}
            file={files[currentFileIndex]}
            fileLength={fileLength}
            currentFileIndex={currentFileIndex}
            handleNextFile={handleNextFile}
            handleBeforeFile={handleBeforeFile}
            setCurrentFileIndex={setCurrentFileIndex}
          />
        )}
      </div>
    </>
  );
}

export default App;
