import React, { useState } from "react";
import Graph from "./Graph";
import Header from "./components/Header";
import Modal from "./components/Modal";
import Tooltip from "./components/Tooltip";

function Home() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
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

    setIsTooltipClicked(!isTooltipClicked);
    setIsTooltipVisible(isTooltipVisible);
  };

  return (
    <div className="h-full w-full relative" onClick={handleClickOutside}>
      <Graph className="h-full w-full -z-20" />
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
      <div
        className={`fixed top-0 left-0 h-full w-1/3 bg-black bg-opacity-75 backdrop-blur-lg p-5 z-60 transition-transform duration-300 ${
          isSideTabOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Side Tab Content */}
        <div className="relative z-20 h-full w-full text-gray-100 ">
          <h1 className="text-2xl font-bold mb-4">Jeffrey Wang</h1>
          <h2 className="text-lg text-gray-300 mb-2">#12345 | Hide-Tide</h2>

          {/* Favorite Phrase Inputs */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-300">Favorite Phrase</label>
            <input
              type="text"
              name="favoritePhrase1"
              value={formData.favoritePhrase1}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-300">Favorite Phrase</label>
            <input
              type="text"
              name="favoritePhrase2"
              value={formData.favoritePhrase2}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-800 text-gray-100 focus:outline-none focus:ring"
            />
          </div>

          {/* Most Used Emotes */}
          <div className="mb-4">
            <h3 className="mb-2 text-gray-300">Most Used Emotes</h3>
            <div className="grid grid-cols-5 gap-2">
              {formData.mostUsedEmotes.map((emote, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white"
                >
                  {emote || index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Longest Conversation */}
          <div className="mb-4">
            <h3 className="mb-2 text-gray-300">
              Longest Consecutive Conversations
            </h3>
            {formData.longestConversation.map((entry, index) => (
              <div key={index} className="flex justify-between text-sm mb-1">
                <span>{entry.person}</span>
                <span>
                  {entry.days} days ({entry.cycles} cycles)
                </span>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleModalOpen}
            className="w-full bg-gray-200 text-black font-bold p-2 rounded mt-4"
          >
            Check it out
          </button>
        </div>
      </div>

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
