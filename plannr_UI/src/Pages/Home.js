import React from "react";
import Carousal from "../Components/Carousal";
import NavTiles from "../Components/NavTiles";

function Home() {
  return (
    <div className="home relative h-screen w-screen">
      <Carousal />

      <div className="flex items-center justify-center md:relative bottom-40">
        <NavTiles />
      </div>
    </div>
  );
}

export default Home;
