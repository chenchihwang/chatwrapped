import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import FormPage from "./FormPage";
import About from "./About";

function App() {
  return (
    <Router>
      <div className="h-screen w-full">
        <Routes>
          {/* Make FormPage load at "/" */}
          <Route path="/" element={<FormPage />} />

          {/* Move Home to "/home" (or remove if you don't need it) */}
          <Route path="/home" element={<Home />} />

          {/* Keep About as is */}
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
