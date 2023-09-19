import React from "react";
import Carousal from "../Components/Carousal";
import NavTiles from "../Components/NavTiles";

function Home() {
  return (
    <div className="home relative h-screen w-screen">
      <Carousal />

      <div className="w-full h-1/4 flex items-center justify-center">
        <div className="w-3/4 h-3/4 flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-lg p-8">
          <p className="text-7xl font-lato text-brand-green mb-6">Plannr App</p>
          <div className="text-center">
            <p className="text-2xl font-playfair leading-relaxed">
              Discover tailored recipes based on your pantry, generate instant
              grocery lists, and share your culinary creations with the Plannr
              community. Dive into a personalized recipe experience with your
              very own digital butler.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center md:relative">
        <NavTiles />
      </div>
    </div>
  );
}

export default Home;
