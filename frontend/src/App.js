// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormPage from "./FormPage";
import Home from "./Home"; // <-- import your Graph component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
