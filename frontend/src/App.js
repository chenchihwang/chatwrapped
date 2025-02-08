import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import FormPage from "./FormPage";
import About from "./About";
import WaitingScreen from "./WaitingScreen";

function App() {
  return (
    <Router>
      <div className="h-screen w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/waiting" element={<WaitingScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
