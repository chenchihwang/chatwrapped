import React, { useState } from "react";
import Graph from "./Graph";
import Header from "./components/Header";

function Home() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);

  const toggleSideTab = () => {
    setIsSideTabOpen(!isSideTabOpen);
  };

  return (
    <div className="h-full w-full relative">
      <Header isHome={true} />
      <Graph className="h-full w-full z-0" />

      {/* Button to open the side tab */}
      <button
        onClick={toggleSideTab}
        className="fixed top-5 left-5 z-50 bg-gray-200 text-black p-2 rounded"
      >
        Open Side Tab
      </button>

      {/* Animated Side Tab */}
      <div
        className={`fixed top-0 right-0 h-full w-1/3 bg-black bg-opacity-75 backdrop-blur-lg p-5 z-40 transition-transform duration-500 ${
          isSideTabOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={toggleSideTab}
          className="absolute top-5 left-[-40px] bg-gray-200 text-black p-2 rounded shadow-lg transition-transform duration-500 hover:translate-x-2"
        >
          →
        </button>
        <div className="relative h-full w-full">
          <h1 className="text-white text-xl font-bold">Your Content</h1>
          <p className="text-gray-200">This is the side tab content.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
