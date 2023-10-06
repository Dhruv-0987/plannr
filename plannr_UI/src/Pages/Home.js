import React from "react";
import Carousal from "../Components/Carousal";
import NavTiles from "../Components/NavTiles";

function Home() {
  return (
    <div className="home relative h-screen w-screen">
      <Carousal />

      <div className="w-full h-1/4 flex items-center justify-center mt-4 sm:mt-0 md:mt-0">
        <div className="w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-3/4 flex flex-col items-center justify-center bg-white bg-opacity-50 rounded-lg p-4 md:p-8">
          
          <div className="text-center flex flex-col gap-y-10">
            <p className="text-xl md:text-4xl font-playfair leading-relaxed italic">
            Choose health and taste for you family, all within your budget and without the stress of planning.
            </p>

            <p className="text-xl md:text-4xl font-playfair leading-relaxed">
            Get started now.
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
