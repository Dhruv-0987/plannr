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
        dispatch(fetchReviewsByRecipeId(recipeId));
        dispatch(fetchAverageRatingByRecipeId(recipeId));
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
            className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover rounded-md"
          />
        )}

        {recipeDetails && (
          <div className="absolute w-11/12 md:w-4/5 lg:w-3/4 bg-white opacity-90 rounded-md shadow-sm left-1/2 top-1/4 md:top-[250px] lg:top-[200px] transform -translate-x-1/2">
            <p className="text-center p-4 text-4xl text-brand-light-green font-lato">
              {recipeDetails.recipeTitle}
            </p>
            <hr className="my-2 bg-gray-200 h-0.5 mx-4" />

            <div className="flex justify-center gap-x-2 align-middle items-center">
              <div className="w-3/4">
                <div className="flex flex-wrap justify-between">
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
                  <span className="m-4 flex justify-evenly gap-x-2">
                    <p className="font-semibold">Type: </p> {recipeDetails.type}
                  </span>
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
          </div>
        )}
      </div>

      {recipeDetails && (
        <div className="w-11/12 md:w-3/4 lg:w-3/4 mt-6 flex flex-col md:flex-row gap-x-2">
          <div className="instructions w-full md:w-3/4 p-4 bg-gray-50 rounded-md shadow-md">
            <p className="text-3xl text-brand-light-green p-1 text-left">
              Instructions
            </p>
            <ol>
              {recipeDetails.instructions.map((instruction, index) => (
                <li key={index} className="py-1 my-2 text-left text-xl">
                  {index + 1}. {instruction}
                </li>
              ))}
            </ol>
          </div>
          <div className="instructions w-full md:w-1/4 p-4 bg-green-50 rounded-md shadow-md">
            <p className="text-3xl text-brand-light-green p-1 text-left">
              Ingredients
            </p>
            <ol>
              {recipeDetails.ingredients.map((instruction, index) => (
                <li key={index} className="py-1 my-2 text-left text-xl">
                  {index + 1}. {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {reviews && (
        <div className="m-6  rounded-md shadow-md w-11/12 md:w-3/4 flex gap-x-2">
          <div className="w-3/4 text-center bg-gray-50">
            <p className="font-lato text-center w-full text-3xl text-brand-light-green p-4 ">
              Reviews & Ratings
            </p>
            <Comments comments={reviews} />
          </div>

          {recipeDetails && <div className="ratings w-full md:w-1/4 bg-green-50 rounded-md shadow-md mt-6 md:mt-0">
            <p className="text-3xl text-brand-light-green p-1 text-left m-4">
              Nutritional Value
            </p>

            <p className="p-1 text-left m-4 flex gap-x-2">
              <p className="font-semibold">Energy:</p> {recipeDetails.energy} kCal
            </p>

            <p className="p-1 text-left m-4 flex gap-x-2">
              <p className="font-semibold">Protein:</p> {recipeDetails.protein} g
            </p>

            <p className="p-1 text-left m-4 flex gap-x-2">
              <p className="font-semibold">Carbohydrates:</p>{" "} 
              {recipeDetails.carbohydrates} g
            </p>

            <p className="p-1 text-left m-4 flex gap-x-2">
              <p className="font-semibold">Fats:</p> {recipeDetails.totalFats} g
            </p>
          </div>}
        </div>
      )}
    </div>
  );
}

export default RecipyDetail;
