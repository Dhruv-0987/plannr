import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function RecipeTile({ recipe, idx, omitRecipe }) {
  const [omitted, setOmitted] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setOmitted(!omitted);
    omitRecipe(recipe.id);
  };

  return (
    <div className="p-4 w-3/4">
      
      <div
        className={`grid grid-cols-2 p-6 border rounded-md shadow-md space-x-4 justify-evenly 
                    ${idx % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    transform transition-transform duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer`}
      >
        <img
          src={recipe.imageUrl}
          alt={recipe.recipeTitle}
          className="max-w-40 h-60 w-80 rounded-md"
        />
        <div className="flex flex-col space-y-8">
          <h2 className="text-3xl font-lato p-2 text-brand-green">
            {recipe.recipeTitle}
          </h2>

          <div className="flex justify-evenly text-xl text-center">
            <span>Cuisine: {recipe.cuisine}</span>
            <span>{recipe.servings} servings</span>
            <span>${recipe.cost.toFixed(2)}</span>
          </div>

          <div className='flex flex-wrap justify-center gap-x-10 items-center align-middle'>
            <div>
              <p className="p-1 font-platfair text-xl">Average Rating</p>
              <div className="mb-2 flex justify-center">
                <Rating
                  name="average-rating"
                  value={recipe.averageRating}
                  precision={0.25}
                  readOnly
                  style={{ color: "green" }}
                />
                <span className="ml-2">{recipe.averageRating}</span>
              </div>
            </div>
            <div>
              <p className="p-1 font-platfair text-xl">Health Rating</p>
              <div className="mb-2 flex justify-center">
                <Rating
                    name="heart-rating"
                    value={recipe.healthRating}
                    precision={0.5}
                    readOnly
                    icon={<FavoriteIcon fontSize="inherit" style={{ color: 'darkgreen' }} />}
                    emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
                <span className="ml-2">{recipe.healthRating}</span>
              </div>
            </div>
          </div>
          <div
            className="flex justify-center m-6 cursor-pointer"
            onClick={() => {
              navigate(`/recipedetail/${recipe.id}`);
            }}
          >
            <p className="text-xl underline hover:text-green-700">
              Show recipe details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeTile;
