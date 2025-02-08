import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import { ReactP5Wrapper } from "react-p5-wrapper";
import ShaderSketch from "./ShaderSketch";

function FormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    graduationYear: "",
    gender: "",
    orientation: "",
    profile: "",
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
    single: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questions = [
    "Describe your perfect weekend",
    "What is your favorite memory with friends?",
    "Do you have a surprising hobby or interest?",
    "When was the last time you felt lucky to be you?",
    "open-ended prompt: write whatever you want!",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/form-submission", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        graduationYear: "",
        single: false,
        gender: "",
        orientation: "",
        profile: "",
        question0: "",
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
      });
      setIsSubmitted(true);
    } else {
      console.log("Form submission failed");
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
              join <span className="font-bold">tartanspace</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="w-full mb-6 md:mb-0">
                <label className="block lowercase tracking-wide text-white text-sm mb-2">
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-900 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="w-full mb-6 md:mb-0">
                <label className="block lowercase tracking-wide text-white text-sm mb-2">
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-800 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="w-full mb-6 md:mb">
                <label className="block lowercase tracking-wide text-white text-sm mb-2">
                  Email@andrew.cmu.edu
                </label>
                <input
                  className="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-800 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  pattern="[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)?cmu\.edu"
                  title="Please enter an email ending with 'cmu.edu'"
                  required
                />
              </div>

              <div className="w-full mb-6 md:mb-0">
                <label className="block lowercase tracking-wide text-white text-sm mb-2">
                  Graduation Year
                </label>
                <input
                  className="appearance-none block w-full bg-gray-900 bg-opacity-50 text-white text-sm border border-gray-800 rounded py-3 px-2 mb-3 leading-tight focus:outline-none focus:border-gray-200"
                  type="text"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-200 text-black font-bold p-2 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormPage;
