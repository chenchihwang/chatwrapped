import React from "react";
import Graph from "./Graph";
import Header from "./components/Header";

function Home() {
  return (
    <div className="h-full w-full relative">
      <Header isHome={true} />
      <Graph className="h-full w-full z-0" />
    </div>
  );
}

export default Home;
