import React, { useState } from "react";

const Modal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onClose();
      setStep(0);
    }
  };

  const content = [
    {
      title: "Your Favorite Phrase",
      text: "You emoted 21,000 times this cycle",
      subtext: "You talked for about 86,000 minutes, equivalent to 2.5 tide cycles",
    },
    { title: "Step 2", text: "This is the second step." },
    { title: "Step 3", text: "This is the third step." },
    { title: "Step 4", text: "This is the fourth step." },
    { title: "Step 5", text: "This is the fifth step." },
  ];

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
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gray-300 rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-300 rounded-tl-full"></div>

        {/* Main content */}
        <div className="relative z-10 text-center flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl font-black mb-8">{content[step].title}</h1>
          {step === 0 && (
            <>
              <p className="text-2xl font-black mb-6 text-yellow-400">{content[step].text}</p>
              <p className="text-lg font-medium text-gray-400">{content[step].subtext}</p>
            </>
          )}
          {step !== 0 && <p className="text-2xl font-black">{content[step].text}</p>}
        </div>

        {/* Next button */}
                <button
        onClick={handleNext}
        className="absolute bottom-5 right-5 text-black font-black underline text-lg p-4 transition-transform duration-300 hover:scale-150"
        >
        Next
        </button>
      </div>
    </div>
  );
};

export default Modal;
