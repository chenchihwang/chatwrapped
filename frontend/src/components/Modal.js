import React, { useState, useEffect } from "react";
import content from "./content";

const Modal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [step]);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onClose();
      setStep(0);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div
        className="relative bg-black text-white p-10 rounded-2xl shadow-lg overflow-hidden"
        style={{
          width: "90vw", // Total width is 90% of the viewport width
          height: "90vh", // Total height is 90% of the viewport height
        }}
      >
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={`/video_background/clip_${step + 1}.mp4`}
          autoPlay
          loop
          muted
        ></video>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white font-black text-2xl transition-transform hover:scale-150 z-20"
        >
          &times;
        </button>

        {/* Main content */}
        <div className="relative z-20 text-center flex flex-col items-center justify-center h-full">
          <h1 className={`text-8xl font-black mb-10 ${step === 3 || step === 5 ? 'text-black' : 'text-white'} transition-transform duration-300 hover:scale-125 ${animate ? 'animate-fade-in-up' : ''}`}>
            {content[step].title}
          </h1>
          {step === 0 && (
            <>
              <p className={`text-2xl font-black mb-6 ${step === 3 || step === 5 ? 'text-black' : 'text-yellow-400'} transition-transform duration-300 hover:scale-125 ${animate ? 'animate-fade-in-up' : ''}`}>
                {content[step].text}
              </p>
              <p className={`text-lg font-medium ${step === 3 || step === 5 ? 'text-black' : 'text-white'} transition-transform duration-300 hover:scale-125 ${animate ? 'animate-fade-in-up' : ''}`}>
                {content[step].subtext}
              </p>
            </>
          )}
          {step !== 0 && (
            <p className={`text-2xl font-black ${step === 3 || step === 5 ? 'text-black' : 'text-white'} transition-transform duration-300 hover:scale-125 ${animate ? 'animate-fade-in-up' : ''}`}>
              {content[step].text}
            </p>
          )}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          className="absolute bottom-2 right-5 text-white font-black underline text-lg p-4 transition-transform duration-300 hover:scale-150 z-20"
        >
          Next
        </button>
        {/* Back button */}
        <button
          onClick={handleBack}
          className="absolute bottom-2 left-5 text-white font-black underline text-lg p-4 transition-transform duration-300 hover:scale-150 z-20"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Modal;
