import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function NavTiles() {
  const navigate = useNavigate();

  return (
    <div className="">
      <div className=" grid md:grid-cols-2 grid-cols-1  justify-center items-center p-5 bg-white bg-opacity-80  md:gap-x-6 
       gap-y-4 lg:w-[1000px] w-full h-80">
        

        <div
          className="transform cursor-pointer hover:scale-105 transition-transform duration-300 w-full h-full flex flex-col 
        justify-between p-4 rounded shadow hover:shadow-xl bg-brand-green opacity-70"
          onClick={() => {
            navigate("/recipy");
          }}
        >
          <div className="text-white text-2xl font-semibold mb-2">
            Recommended Recipes
          </div>
          <p className="text-white text-xl mb-6 p-4 font-playfair">
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
        justify-between p-4 rounded shadow hover:shadow-xl bg-brand-green opacity-70"
          onClick={() => {
            navigate("/suggestions");
          }}
        >
          <div className="text-white text-2xl font-semibold mb-2">
            Join Our Community
          </div>
          <p className="text-white text-xl mb-6 p-4 font-playfair">
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
