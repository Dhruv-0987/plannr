import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentRecipeDetails } from "../StateManagement/RecipeSlice";
import {
  fetchAverageRatingByRecipeId,
  fetchRecipeById,
  fetchReviewsByRecipeId,
} from "../StateManagement/Effects";
import { useParams } from "react-router-dom";
import RatingModal from "../Components/RatingModal";
import PlannrApiService from "../AppService";
import { toast } from "react-toastify";
import {
  selectAverageRatingByRecipe,
  selectReviewsByRecipe,
} from "../StateManagement/ReviewSlice";
import Rating from "@mui/material/Rating";
import Comments from "../Components/Comments";

function RecipyDetail({ props }) {
  const { recipeId } = useParams();
  const dispatch = useDispatch();
  const recipeDetails = useSelector(selectCurrentRecipeDetails);
  const [openRatingModal, setOpenRatingModal] = useState(null);
  const averageRating = useSelector(selectAverageRatingByRecipe);
  const reviews = useSelector(selectReviewsByRecipe);

  useEffect(() => {
    dispatch(fetchRecipeById(recipeId));
    dispatch(fetchAverageRatingByRecipeId(recipeId));
    dispatch(fetchReviewsByRecipeId(recipeId));
    console.log(recipeDetails);
  }, []);

  const handleOpenRatingModal = () => {
    setOpenRatingModal(true);
  };

  const handleClose = () => {
    setOpenRatingModal(false);
  };

  const handleSubmitRating = ({ rating, comment }) => {
    PlannrApiService.addRating(recipeId, rating, comment).then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        toast.success("Review added Succesfully!");
      }
    });
  };

  return (
    <div className="flex flex-col align-middle items-center w-full gap-x-6">
      <RatingModal
        isOpen={openRatingModal}
        handleClose={handleClose}
        onSubmit={handleSubmitRating}
      />
      <div className="relative w-full">
        {recipeDetails && (
          <img
            src={recipeDetails.imageUrl}
            className="w-full h-[50vh] object-cover rounded-md"
          />
        )}

        {recipeDetails && (
          <div className="absolute w-3/4 bg-white opacity-90 rounded-md shadow-sm left-1/2 top-[400px] transform -translate-x-1/2">
            <p className="text-center p-4 text-4xl text-brand-light-green font-lato">
              {recipeDetails.recipeTitle}
            </p>
            <hr className="my-2 bg-gray-200 h-0.5 mx-4" />

            <div className="flex justify-evenly gap-x-2 align-middle items-center">
              <div className="w-3/4">
                <div className="flex justify-between">
                  <span className="m-4 flex justify-evenly gap-x-2">
                    <p className="font-semibold">Cuisine: </p>
                    {recipeDetails.cuisine}
                  </span>
                  <span className="m-4 flex justify-evenly gap-x-2">
                    <p className="font-semibold">Servings: </p>
                    {recipeDetails.servings}
                  </span>
                  <span className="m-4 flex justify-evenly gap-x-2">
                    <p className="font-semibold">Cost: </p>${" "}
                    {recipeDetails.cost}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className=" m-4 flex flex-wrap justify-evenly">
                    <p className="font-semibold">Ingredients: </p>
                    {recipeDetails.ingredients.map((ingredient, index) => {
                      return (
                        <span key={index}>
                          {ingredient}
                          {index !== recipeDetails.ingredients.length - 1
                            ? ", "
                            : ""}
                        </span>
                      );
                    })}
                  </span>
                </div>
              </div>

              <div>
                <p className="p-1 font-platfair text-xl">Average Rating</p>
                <div className="mb-2 flex justify-center">
                  <Rating
                    name="average-rating"
                    value={averageRating}
                    precision={0.25}
                    readOnly
                    style={{ color: "green" }}
                  />
                  <span className="ml-2">{averageRating}</span>
                </div>

                <button
                  className="p-2 rounded-md shadow-sm bg-brand-light-green text-white h-10 w-40 m-2"
                  onClick={() => handleOpenRatingModal(true)}
                >
                  Rate Recipe
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {recipeDetails && (
        <div className=" w-3/4  mt-6 flex gap-x-2">
          <div className="instructions w-3/4 mt-6 p-4 bg-white rounded-md shadow-md">
            <p className="text-3xl text-brand-light-green p-1 text-left">
              Instructions To Make
            </p>
            <ol>
              {recipeDetails.instructions.map((instruction, index) => (
                <li key={index} className="py-1 my-2 text-left text-xl">
                  {index + 1}. {instruction}
                </li>
              ))}
            </ol>
          </div>

          <div className="ratings w-1/4 bg-white rounded-md shadow-md mt-6">
            <p className="text-3xl text-brand-light-green p-1 text-left m-4">
              Nutritional Value
            </p>

            <p className="p-1 text-left m-4 flex gap-x-2">
              <p className="font-semibold">Energy:</p> {recipeDetails.energy}
            </p>

            <p className="p-1 text-left m-4 flex gap-x-2">
              <p className="font-semibold">Protein:</p> {recipeDetails.protein}
            </p>

            <p className="p-1 text-left m-4 flex gap-x-2">
              <p className="font-semibold">Carbohydrates:</p>{" "}
              {recipeDetails.carbohydrates}
            </p>

            <p className="p-1 text-left m-4 flex gap-x-2">
              <p className="font-semibold">Fats:</p> {recipeDetails.totalFats}
            </p>
          </div>
        </div>
      )}

      {reviews && (
        <div className="m-6 bg-white rounded-md shadow-md w-3/4">
        <p className="font-lato text-3xl text-brand-light-green p-4">Reviews & Ratings</p>
          <Comments comments={reviews} />
        </div>
      )}
    </div>
  );
}

export default RecipyDetail;
