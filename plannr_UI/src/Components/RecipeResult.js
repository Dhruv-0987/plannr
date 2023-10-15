import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectFilteredRecipes } from "../StateManagement/RecipeSlice";
import RecipeTile from "./RecipeTile";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

function RecipeResult() {
  const navigate = useNavigate();
  const originalRecipes = useSelector(selectFilteredRecipes);
  const [recipes, setRecipes] = useState(originalRecipes);
  const [recipesToOmit, setRecipesToOmit] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSorted, setIsSorted] = useState(false);
  const [isSortedByHealtRating, setIsSortedByHealthRating] = useState(false);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const handleRatingFilter = () => {
    if (isSorted) {
      // If currently sorted, revert back to original order
      setRecipes(originalRecipes);
      setIsSorted(false);
    } else {
      // If not sorted, sort by averageRating
      const sorted = [...originalRecipes].sort(
        (a, b) => b.averageRating - a.averageRating
      );
      setRecipes(sorted);
      setIsSorted(true);
      setIsSortedByHealthRating(false);
    }
  };

  const handleByHealthRatingFilter = () => {
    if (isSortedByHealtRating) {
      // If currently sorted, revert back to original order
      setRecipes(originalRecipes);
      setIsSortedByHealthRating(false);
    } else {
      // If not sorted, sort by averageRating
      const sorted = [...originalRecipes].sort(
          (a, b) => b.healthRating - a.healthRating
      );
      setRecipes(sorted);
      setIsSorted(false);
      setIsSortedByHealthRating(true);
    }
  };

  const handleRecipeOmit = (id) => {
    if (recipesToOmit.includes(id)) {
      setRecipesToOmit((prev) => prev.filter((item) => item !== id));
    } else {
      setRecipesToOmit((prev) => [...prev, id]);
    }
  };

  return (
    <div className="w-3/4 border-white rounded-md shadow-md p-6">
      {recipes.length === 0 ? (
        // Display this content if there are no recipes
        <p className="reciperesult text-center text-3xl font-playfair text-red-400">
          Oops! No recipes available for your requirements
        </p>
      ) : (
        // Display this content if there are recipes
        <>
          <p className="reciperesult text-center text-3xl font-playfair text-brand-green">
            Here are your Recipe Recommendations!
          </p>

          <div className='flex justify-center w-3/4 p-2 gap-x-6'>

              <button
                  onClick={handleRatingFilter}
                  className="mt-6 px-6 py-2 bg-brand-light-green text-white rounded-lg shadow-md hover:bg-brand-green-darker transition-transform transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-green-lighter active:bg-brand-green-dark active:scale-95"
              >
                {isSorted ? "Revert to Original Order" : "Sort by Rating"}
              </button>



              <button
                  onClick={handleByHealthRatingFilter}
                  className="mt-6 px-6 py-2 bg-brand-light-green text-white rounded-lg shadow-md hover:bg-brand-green-darker transition-transform transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-green-lighter active:bg-brand-green-dark active:scale-95"
              >
                {isSortedByHealtRating ? "Revert to Original Order" : "Sort by Nutritional Rating"}
              </button>
            </div>



          <div className="flex flex-col justify-center align-middle items-center">
            {recipes.slice(startIndex, endIndex).map((recipe, idx) => (
              <RecipeTile key={recipe.id} recipe={recipe} idx={idx} omitRecipe={handleRecipeOmit}/>
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
