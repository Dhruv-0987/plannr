import React, { useState } from "react";

function RecipeTile({ recipe }) {
  const [showMoreIngredients, setShowMoreIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [opacity, setOpacity] = useState(0);

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
    <div className="p-4">
      <div className="flex p-6 border rounded-md shadow-md space-x-4">
        <img
          src={recipe.imageUrl}
          alt={recipe.recipeTitle}
          className="h-[200px] max-w-40 w-60 rounded-md"
        />
        <div className="flex-1 space-y-2">
          <h2 className="text-xl font-semibold p-2 text-brand-green">
            {recipe.recipeTitle}
          </h2>
          <div className="text-sm">
            <p className="text-xl text-brand-green">Ingredients Required</p>
            {showMoreIngredients ? (
              <div className="text-left p-2">
                {recipe.ingredients.join(", ")}
                <span
                  className="text-brand-green cursor-pointer ml-2"
                  onClick={() => setShowMoreIngredients(false)}
                >
                  See Less
                </span>
              </div>
            ) : (
              <div>
                {recipe.ingredients.slice(0, 5).join(", ")}
                {recipe.ingredients.length > 5 && ( // Only show "See More" if there are more than 5 ingredients
                  <span
                    className="text-brand-green cursor-pointer"
                    onClick={() => setShowMoreIngredients(true)}
                  >
                    ... See More
                  </span>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-evenly p-2">
            <span>Cuisine: {recipe.cuisine}</span>
            <span>{recipe.servings} servings</span>
            <span>${recipe.cost.toFixed(2)}</span>
          </div>
          <div>
            <button
              className="text-brand-green mt-4"
              onClick={handleToggleInstructions}
            >
              {showInstructions ? "Hide Instructions" : "See Instructions"}
            </button>
            {showInstructions && (
              <ol
                className={`mt-4 pl-4 space-y-2 list-decimal transition-opacity duration-300 ease-in-out opacity-${opacity}`}
              >
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="pl-2 py-1 break-words text-left">
                    {step.trim()}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeTile;
