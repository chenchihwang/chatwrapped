import React from "react";
import Header from "./components/Header";

const About = () => {
  return (
    <div className="h-screen w-full">
      <Header isHome={false} />

      <div className="flex flex-col items-center pt-10">
        <div className="w-10/12 sm:w-1/2 mt-10 mb-10 bg-black bg-opacity-75 backdrop-blur-lg p-5 rounded text-white">
          <p>
            <span className="font-bold text-gray-200">tartanspace</span> is a
            tool that connects students at Carnegie Mellon using vector
            embeddings.
          </p>
          <h1 className="font-extrabold text-2xl mt-3 mb-3">FAQ</h1>
          <h3 className="font-bold text-xl">How does this work?</h3>
          <p className="mt-3 mb-3">
            You complete the form, which contains questions designed to get a
            sense of who you are. Then, based on the semantic information
            contained in your response, our algorithm places you at some point
            in our interactive visual space, which you can explore!
          </p>
          <p className="mb-3">
            Once the form submission closes, we'll email you the names and
            contact information of the people who were closest to you in the
            space. If you indicated that you're single and want to be matched,
            we'll also use our algorithm to send you a few relevant singles who
            opted in; you'll be able to "swipe right" on any of them. If they
            also "swipe right" on you, we'll let you know!
          </p>
          <h3 className="font-bold text-xl">
            But, like, how does this actually work?
          </h3>
          <p className="mt-3 mb-3">
            We embed your text responses into high-dimensional space using a
            transformer-based language model and then map embeddings to a
            3-dimensions using PCA.
          </p>
          <h3 className="font-bold text-xl">What data do you store?</h3>
          <p className="mt-3 mb-3">
            We store your name, email, graduation year, and contact info. If you
            opt-in to matchmaking, we also store the fields that help us match
            you (e.g. gender and sexual orientation). We DO NOT store your text
            responses to the questions used to place you in tartanspace. We
            compute embeddings on our server and only store those--so write
            freely, no one can see your answers, and better answers place you
            more accurately in the space!
          </p>
          <h3 className="font-bold text-xl">
            I want to do this but I really don't want to be matched with ____.
          </h3>
          <p className="mt-3 mb-3">Send us an email at team@tartanspace.xyz</p>
        </div>
      </div>
    </div>
  );
};

export default About;
