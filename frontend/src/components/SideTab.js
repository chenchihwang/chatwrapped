import React from "react";

const SideTab = ({ isSideTabOpen, formData, handleChange, handleModalOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-1/3 bg-black bg-opacity-75 backdrop-blur-lg z-50 p-5 transition-transform duration-300 ${
        isSideTabOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Side Tab Content */}
      <div className="relative h-full w-full text-gray-100 z-50">
        <h1 className="text-2xl font-bold mb-4 z-50">Jeffrey Wang</h1>
        <h2 className="text-lg text-gray-300 mb-2 z-50">#12345 | Hide-Tide</h2>

        {/* Favorite Phrase Inputs */}
        <div className="mb-4 z-50">
          <label className="block mb-2 text-gray-300 z-50">Favorite Phrase</label>
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
        <div className="mb-4 z-50">
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
        <div className="mb-4 z-50">
          <h3 className="mb-2 text-gray-300">Longest Consecutive Conversations</h3>
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
          className="w-full bg-gray-200 text-black font-bold p-2 rounded mt-4 z-50"
        >
          Check it out
        </button>
      </div>
    </div>
  );
};

export default SideTab;