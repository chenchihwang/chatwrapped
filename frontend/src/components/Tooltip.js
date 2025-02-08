import React from "react";

const Tooltip = ({ isVisible, position, onCheckItOut }) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute bg-black bg-opacity-75 text-white p-4 rounded shadow-lg z-50"
      style={{ top: position.y, left: position.x }}
    > 
      <h1 className="text-2xl font-bold mb-4">Jeffrey Wang</h1>
      <h2 className="text-lg text-gray-300 mb-2">#12345 | Hide-Tide</h2>
      <button
        onClick={onCheckItOut}
        className="w-full bg-gray-200 text-black font-bold p-2 rounded mt-4"
      >
        Check it out
      </button>
    </div>
  );
};

export default Tooltip;