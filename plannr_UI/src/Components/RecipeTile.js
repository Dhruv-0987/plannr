import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RecipeTile({ recipe, idx }) {
  const [showMoreIngredients, setShowMoreIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const navigate = useNavigate();

  const handleToggleInstructions = () => {
    if (showInstructions) {
      setOpacity(0);
      setTimeout(() => {
        setShowInstructions(false);
      }, 300); // Corresponds to the transition duration
    } else {
      setShowInstructions(true);
      setOpacity(100);
    }
  };

  return (
    <div className="p-4 w-3/4">
      <div
        className={`grid grid-cols-2 p-6 border rounded-md shadow-md space-x-4 justify-evenly 
                  ${idx % 2 == 0 ? `bg-gray-100` : `bg-white`}
                  transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer`}
      >
        <img
          src={recipe.imageUrl}
          alt={recipe.recipeTitle}
          className="h-[200px] max-w-40 w-80 rounded-md"
        />
        <div className="flex flex-col space-y-8">
          <h2 className="text-3xl font-lato p-2 text-brand-green">
            {recipe.recipeTitle}
          </h2>

          <div className="flex justify-center gap-x-10 text-xl text-center">
            <span>Cuisine: {recipe.cuisine}</span>
            <span>{recipe.servings} servings</span>
            <span>${recipe.cost.toFixed(2)}</span>
          </div>

          <div className="flex justify-center m-6 cursor-pointer"
          onClick={()=>{navigate(`/recipedetail/${recipe.id}`)}}>
            <p className="text-xl underline hover:text-green-700">Show recipe details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeTile;
