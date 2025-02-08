import React from "react";
import Header from "./components/Header";

const About = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Header isHome={false} />

      <video id="bg-video" className="fixed top-0 left-0 w-full h-full object-cover -z-10" autoPlay loop muted>
        <source src="/video_background/2_1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex flex-col items-center pt-10 relative z-10">
        <div className="w-10/12 sm:w-1/2 mt-10 mb-10 bg-black bg-opacity-75 backdrop-blur-lg p-5 rounded text-white">
          <p>
            <span className="font-bold text-gray-200">ChatWrapper</span> is an AI 
            generated discord 'wrapped'. It also offers a 
            unique experience that visualizes the similarity of the way people type 
            and act on discord helping users to see where they may lie in the spectrum 
            of humor, dryness, as well as showing various other interesting metrics. 
            Our project is a tool designed as a proof of concept, reinventing the way 
            personalized content is created and experienced. 
          </p>

            <h1 className="font-extrabold text-2xl mt-3 mb-3">FAQ</h1>
            <h3 className="font-bold text-xl">How does this work?</h3>

          <p className="mt-3 mb-3">
            You submit a JSON file of any of your chat histories whether that may be in 
            DM's or in a server. We then process this data and generate a summarization of it 
            with information including your most frequently used emojis, words, a humor and dryness rating and more.
            We use generative AI to create a 'spotify wrapped'-esque experience for your enjoyment. Additionally we take your
            key metrics and plot them in the stars so you can identify the similarities and differences.
          </p>

            <h3 className="font-bold text-xl">
              But, like, how does this actually work?
            </h3>

          <p className="mt-3 mb-3">
            We process your data with various many techniques, parsing through the JSON to find the most frequently
            used words, emojis and other metrics. We find the topic via ....
            To do the plotting, we embed your text responses into high-dimensional space using a
            transformer-based language model and then map embeddings to a
            3-dimensions using PCA.
          </p>

          <h3 className="font-bold text-xl">What data do you store?</h3>
          <p className="mt-3 mb-3">
            We store your discord username as well as the generated metrics after using your
            text messages. We DO NOT store your text
            messages themselves used to place you in tartanspace. We
            compute embeddings on our server and only store those--so more raw text messages places 
            you more accurately in the space!
          </p>

        </div>
      </div>
    </div>
  );
};

export default About;