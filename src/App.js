import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import SamplePdf from './sample.pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import Modal from 'react-modal';
import FileViewer from "react-file-viewer";


Modal.setAppElement('#root');



function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  let subtitle;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const file = "./sample.pdf";
  const type = "pdf";
  const onError = e => {
  console.log(e, "error in file-viewer");
};


  return (
    <>
     <div>
  
     </div>
     <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
              <FileViewer fileType={type} filePath={file} onError={onError}/>

      </Modal>

    </div>
    </>
  );
}

export default App;
