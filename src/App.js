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
      // location: SampleImage,
      location: "https://picsum.photos/seed/picsum/1200/900",
      mimeType: "image",
      name: "sample-image1.jpg",
    },
    {
      // location: SamplePdf,
      location:
        "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
      mimeType: "pdf",
      name: "sample-pdf.pdf",
    },
    {
      location: SampleExcel,
      mimeType: "excel",
      name: "sample-excel.xlsx",
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
          File Preview
        </button>
        {isOpen && (
          <FilePreview
            files={files}
            // show={}
            size='lg' //todo: show different size
            handleClose={setIsOpen}
          />
        )}
      </div>
    </>
  );
}

export default App;
