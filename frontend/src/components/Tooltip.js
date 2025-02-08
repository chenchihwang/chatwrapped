import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
import TooltipShader from "./TooltipShader";

const Tooltip = ({ isVisible, position, onCheckItOut }) => {
  if (!isVisible) return null;

  return (
    <div
      className="absolute p-6 rounded-2xl shadow-lg overflow-hidden"
      style={{
        top: position.y,
        left: position.x,
        transform: "translate(-50%, -50%)", // Center the tooltip region
        minWidth: "300px",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Circle at the top */}
      <div
        className="w-16 h-16 bg-red-500 rounded-full mb-4 z-20"
        style={{
          position: "absolute",
          top: "-40px", // Positioned above the rectangle
          left: "calc(50% - 32px)", // Center the circle horizontally
        }}
      ></div>

      {/* Rectangle with Shader Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ borderRadius: "16px", overflow: "hidden" }}
      >
        <ReactP5Wrapper sketch={TooltipShader} />
      </div>

      {/* Rectangle Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-2xl font-bold mb-2 text-white">Jeffrey Wang</h1>
        <h2 className="text-lg mb-4 text-white">High Tide #12345</h2>
        <button
          onClick={onCheckItOut}
          className="px-4 py-2 bg-black text-white font-semibold rounded-full"
        >
          Check out
        </button>
      </div>
    </div>
  );
};

export default Tooltip;
