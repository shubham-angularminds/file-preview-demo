import React, { useState } from 'react';
import './App.css';
import styles from "./App.module.css";
import Modal from "./components/modal";

function App() {
const [isOpen, setIsOpen] = useState(false);

  return (
    <>
     <div>
     <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </div>
    </>
  );
}

export default App;
