import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";
// import { ShaderSketch} from "./ShaderSketch";

function WaitingScreen() {
  return (
    <div className="h-screen w-full relative">
      {/* Shader Background */}
      {/* <ReactP5Wrapper sketch={ShaderSketch} /> */}

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-white">
        <h1 className="text-3xl font-bold">Please wait...</h1>
      </div>
    </div>
  );
}

export default WaitingScreen;