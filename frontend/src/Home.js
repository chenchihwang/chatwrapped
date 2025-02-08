import React, { useState } from "react";
import Graph from "./Graph";
import Header from "./components/Header";
import { ReactP5Wrapper } from "react-p5-wrapper";
import ShaderSketch from "./ShaderSketch";

function Home() {
  const [isSideTabOpen, setIsSideTabOpen] = useState(false);
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

  const toggleSideTab = () => {
    setIsSideTabOpen(!isSideTabOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="h-full w-full relative">
      <Header isHome={true} isSideTabOpen={isSideTabOpen} />
      <Graph className="h-full w-full z-0" />

      {/* Button to open the side tab */}
      <button
        onClick={toggleSideTab}
        className={`fixed top-5 left-5 z-50 bg-gray-200 text-black p-2 rounded-full transition-transform duration-500 ${
          isSideTabOpen ? "translate-x-1/3" : ""
        }`}
      >
        {isSideTabOpen ? "←" : "→"}
      </button>

      {/* Animated Side Tab */}
      <div
        className={`fixed top-0 left-0 h-full w-1/3 bg-black bg-opacity-75 backdrop-blur-lg p-5 z-40 transition-transform duration-500 ${
          isSideTabOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Shader Background */}
        <div className="absolute inset-0 z-10">
          {/* <ReactP5Wrapper sketch={ShaderSketch} /> */}
        </div>

        {/* Side Tab Content */}
        <div className="relative z-20 h-full w-full text-gray-100">
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
          <button className="w-full bg-gray-200 text-black font-bold p-2 rounded mt-4">
            Check it out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
