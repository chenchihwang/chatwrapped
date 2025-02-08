import React, { useState } from "react";
import Graph from "./Graph";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Tooltip from "./components/Tooltip";
import SideTab from "./components/SideTab";

function Home() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isTooltipClicked, setIsTooltipClicked] = useState(false);
  const [formData, setFormData] = useState({
    favoritePhrase1: "",
    favoritePhrase2: "",
    mostUsedEmotes: ["", "", "", "", ""],
    longestConversation: [
      { person: "Chen", days: 450, cycles: 12 },
      { person: "Chen", days: 450, cycles: 12 },
      { person: "Chen", days: 450, cycles: 12 },
    ],
  });

  const handleMouseEnterLeft = () => {
    setTimeout(() => {
      setIsSideTabOpen(true);
    }, 300);
  };

  const handleClickOutside = (e) => {
    if (!isModalOpen && isSideTabOpen && e.clientX > window.innerWidth / 3) {
      setIsSideTabOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMouseEnter = (e) => {
    if (!isTooltipClicked) {
      setTooltipPosition({ x: e.clientX, y: e.clientY });
      setIsTooltipVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTooltipClicked) {
      setIsTooltipVisible(false);
    }
  };

  const handleTooltipClick = (e) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setIsTooltipClicked(!isTooltipClicked);
    setIsTooltipVisible(!isTooltipVisible);
  };

  return (
    <div className="h-full w-full relative" onClick={handleClickOutside}>
      <Graph className="h-full w-full -z-40" />
      <SideTab
        className= "z-50"
        isSideTabOpen={isSideTabOpen}
        formData={formData}
        handleChange={handleChange}
        handleModalOpen={handleModalOpen}
        style={{ zIndex: 50 }} 
        />
      <Header isHome={true} isSideTabOpen={isSideTabOpen} />


      {/* Left 1/6 part of the screen */}
      <div
        className="fixed top-0 left-0 h-full"
        style={{ width: "16.6667vw" }}
        onMouseEnter={handleMouseEnterLeft}
      ></div>

      {/* Box with ">" icon */}
      {!isSideTabOpen && (
        <div className="fixed top-1/2 left-0 transform -translate-y-1/2 w-8 h-8 bg-gray-800 text-white flex items-center justify-center cursor-pointer z-50">
          &gt;
        </div>
      )}

      {/* Animated Side Tab */}
  

      {/* Tooltip */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleTooltipClick}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full z-50 cursor-pointer"
      ></div>

      <Tooltip
        isVisible={isTooltipVisible}
        position={tooltipPosition}
        onCheckItOut={handleModalOpen}
      />

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleModalClose} />
     
  
    </div>
  );
}

export default Home;
