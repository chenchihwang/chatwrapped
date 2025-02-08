// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";

import Home from "./Home"; 
import UploadComponent from './components/UploadComponent';
import Graph from './Graph';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <div className="App">
        <header className="App-header">
          <h1>Chat Wrapped</h1>
        </header>
        <UploadComponent />
        <Graph />

      </div>
    </Router>
  );
}

export default App;
