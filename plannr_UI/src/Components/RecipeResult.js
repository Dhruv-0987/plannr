import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredRecipes } from "../StateManagement/RecipeSlice";
import RecipeTile from "./RecipeTile";

const ITEMS_PER_PAGE = 5;

function RecipeResult() {
  const recipes = useSelector(selectFilteredRecipes);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <div className="w-3/4 border-white shadow-md p-6">
      <p className="reciperesult text-center text-3xl font-playfair text-brand-green">
        Here are your Recipe Recommendations!
      </p>

      <div>
        {recipes.slice(startIndex, endIndex).map((recipe) => (
          <RecipeTile key={recipe.id} recipe={recipe} />
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(recipes.length / ITEMS_PER_PAGE) }).map(
          (_, index) => (
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
          )
        )}
      </div>
      
    </div>
  );
}

export default RecipeResult;
