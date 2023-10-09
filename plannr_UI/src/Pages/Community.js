import React from "react";
import MapComponent from "../Components/Map";

function Community() {
  return (
    <div>
      <MapComponent />

      <div>
        <p className="text-4xl m-4 p-4 text-brand-green font-playfair">🍎 Dive into Food & Health Events! 🥦</p>
        <p>
          {" "}
          Host a nutritious workshop, share a recipe, or start a fitness
          challenge. Gather, nourish, and thrive together. Your health-minded
          community awaits!
        </p>
      </div>
    </div>
  );
}

export default Community;
