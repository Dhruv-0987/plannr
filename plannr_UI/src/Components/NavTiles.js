import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function NavTiles() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="overlay grid md:grid-cols-3 grid-cols-1  justify-center items-center p-5 bg-white bg-opacity-80 shadow-md gap-x-6 lg:w-[1000px] w-full h-80">
        <div
          className="transform cursor-pointer hover:scale-105 transition-transform duration-300 h-full w-full flex 
        flex-col justify-between p-4 bg-white rounded shadow hover:shadow-xl"
          onClick={() => {
            navigate("/suggestions");
          }}
        >
          <div className="text-brand-green  text-2xl font-semibold mb-2">
            Personalized Groceries
          </div>
          <p className="text-gray-700 text-xl mb-6 p-4 font-playfair">
            Get a tailored grocery list that meets your budget and calorie
            requirements.
          </p>
          <button
            className="flex items-center justify-center px-5 py-2 bg-white rounded transition ease-in-out duration-300"
            onClick={() => {
              navigate("/suggestions");
            }}
          >
            Explore Suggestions
            <ArrowForwardIosIcon style={{ marginLeft: "8px" }} />
          </button>
        </div>

        <div
          className="transform cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-full flex flex-col 
        justify-between p-4 bg-white rounded shadow hover:shadow-xl"
          onClick={() => {
            navigate("/recipy");
          }}
        >
          <div className="text-brand-green text-2xl font-semibold mb-2">
            Recommended Recipes
          </div>
          <p className="text-gray-700 text-xl mb-6 p-4 font-playfair">
            Discover delicious recipes crafted from your suggested groceries.
          </p>
          <button
            className="flex items-center justify-center px-5 py-2 bg-white rounded transition ease-in-out duration-300"
            onClick={() => {
              navigate("/");
            }}
          >
            View Recipes
            <ArrowForwardIosIcon style={{ marginLeft: "8px" }} />
          </button>
        </div>

        <div
          className="transform cursor-pointer hover:scale-105 transition-transform duration-300 h-full w-full flex flex-col 
        justify-between p-4 bg-white rounded shadow hover:shadow-xl"
          onClick={() => {
            navigate("/suggestions");
          }}
        >
          <div className="text-brand-green text-2xl font-semibold mb-2">
            Join Our Community
          </div>
          <p className="text-gray-700 text-xl mb-6 p-4 font-playfair">
            Participate in events focused on healthy eating without breaking the
            bank.
          </p>
          <button
            className="flex items-center justify-center px-5 py-2 bg-white rounded transition ease-in-out duration-300"
            onClick={() => {
              navigate("/");
            }}
          >
            Upcoming Events
            <ArrowForwardIosIcon style={{ marginLeft: "8px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavTiles;
