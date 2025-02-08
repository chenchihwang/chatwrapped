// FormPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import { ReactP5Wrapper } from "react-p5-wrapper";
import ShaderSketch from "./ShaderSketch";

function FormPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = async (event) => {
    event.preventDefault();

    try {
      const fileInput = document.getElementById("fileInput");
      const usernameInput = document.getElementById("username");

      if (!fileInput.files[0]) {
        alert("Please select a file first.");
        return;
      }

      const uploadFormData = new FormData();
      uploadFormData.append("file", fileInput.files[0]);
      uploadFormData.append("username", usernameInput.value);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadFormData,
      });
      const result = await response.json();

      if (response.ok) {
        alert(result.message); // e.g. "File uploaded successfully!"
        // Show the returned user_data if needed
        document.getElementById("userData").innerText = JSON.stringify(
          result.user_data,
          null,
          2
        );
        setIsSubmitted(true);
      } else {
        console.log("Upload failed:", result.message);
      }
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  return (
    <div className="h-screen w-full relative">
      <Header isHome={false} />

      {/* Shader Background - Positioned Behind Content */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <ReactP5Wrapper sketch={ShaderSketch} />
      </div>

      {/* Form Container - Positioned Above Shader */}
      <div className="flex justify-center items-center pt-10 relative z-10">
        {isSubmitted ? (
          <div className="w-10/12 sm:w-1/2 mt-20 mb-10 bg-black bg-opacity-20 backdrop-blur-lg p-5 pb-2 rounded text-gray-200">
            <h1 className="block text-center tracking-wide text-gray-200 text-3xl font-semibold mb-4">
              You're in.
            </h1>
            <p className="text-center">
              Go to{" "}
              <Link
                className="font-bold text-center text-gray-200 opacity-85"
                to="/"
              >
                tartanspace
              </Link>
            </p>
          </div>
        ) : (
          <div className="w-10/12 sm:w-1/2 mt-10 mb-10 bg-black bg-opacity-75 backdrop-blur-lg p-5 rounded text-gray-200 relative z-10">
            <h1 className="block text-center tracking-wide text-gray-200 text-3xl font-semibold mb-4">
              Chat <span className="font-bold">Wrapper</span>
            </h1>

            {/* Single form for username + file upload */}
            <form
              id="uploadForm"
              onSubmit={handleFileUpload}
              className="space-y-4"
              encType="multipart/form-data"
            >
              <div className="w-full mb-6 md:mb-0">
                <label
                  className="block lowercase tracking-wide text-white text-sm mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-900 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                  type="text"
                  id="username"
                  name="username"
                  required
                />
              </div>

              <div className="w-full mb-6 md:mb-0">
                <label
                  className="block lowercase tracking-wide text-white text-sm mb-2"
                  htmlFor="fileInput"
                >
                  File
                </label>
                <input
                  className="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-900 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                  type="file"
                  id="fileInput"
                  name="file"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-200 text-black font-bold p-2 rounded"
              >
                Upload
              </button>
            </form>

            {/* Display server response */}
            <div id="userData" className="text-white mt-4"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormPage;