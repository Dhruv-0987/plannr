import React from "react";
import Carousal from "../Components/Carousal";
import NavTiles from "../Components/NavTiles";

function Home() {
  return (
    <div className="home relative h-screen w-screen">
      <Carousal />

      <div className="w-full h-1/4 flex items-center justify-center mt-4 sm:mt-0 md:mt-0">
        <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-3/4 flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-lg p-4 md:p-8">
          <p className="text-4xl md:text-5xl lg:text-6xl font-lato text-brand-green mb-4 md:mb-6">
            Plannr App
          </p>
          <div className="text-center">
            <p className="text-xl md:text-2xl font-playfair leading-relaxed">
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
