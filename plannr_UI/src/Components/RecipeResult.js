import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredRecipes } from "../StateManagement/RecipeSlice";
import RecipeTile from "./RecipeTile";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

function RecipeResult() {
  const navigate = useNavigate();
  const recipes = useSelector(selectFilteredRecipes);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <div className="w-3/4 border-white rounded-md shadow-md p-6">
      {recipes.length === 0 ? (
        // Display this content if there are no recipes
        <p className="reciperesult text-center text-3xl font-playfair text-red-400">Oops! No recipes available for your requirements</p>
      ) : (
        // Display this content if there are recipes
        <>
          <p className="reciperesult text-center text-3xl font-playfair text-brand-green">
            Here are your Recipe Recommendations!
          </p>

          <div className="flex flex-col justify-center align-middle items-center">
            {recipes.slice(startIndex, endIndex).map((recipe, idx) => (
              <RecipeTile key={recipe.id} recipe={recipe} idx={idx} />
            ))}
          </div>

          <div className="flex justify-evenly gap-x-40 p-3">
            <div className="mt-4 flex justify-center">
              {Array.from({
                length: Math.ceil(recipes.length / ITEMS_PER_PAGE),
              }).map((_, index) => (
                <button
                  key={index}
                  className={`mx-1 px-3 py-1 border rounded-md ${
                    currentPage === index + 1
                      ? "bg-brand-green text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <button
              className="p-3 bg-brand-green text-white rounded-lg shadow-md hover:bg-brand-green-darker transition-transform 
          transform duration-300 ease-in-out  focus:ring-2 focus:ring-brand-green-lighter 
          active:bg-brand-green-dark active:scale-95"
              onClick={() => {
                navigate("/groceries");
              }}
            >
              Generate Grocery List
              <ArrowForwardIosIcon style={{ marginLeft: "8px" }} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeResult;
