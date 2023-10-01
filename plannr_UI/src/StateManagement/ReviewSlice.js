import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAverageRatingByRecipeId,
  fetchReviewsByRecipeId,
} from "./Effects";

const initialState = {
  reviewsByRecipe: [],
  reviewsLoaded: null,
  averageRatingByRecipe: null,
  averageRatingLoaded: null,
};

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsByRecipeId.pending, (state) => {
        state.reviewsLoaded = false;
      })
      .addCase(fetchReviewsByRecipeId.fulfilled, (state, action) => {
        state.reviewsLoaded = true;
        state.reviewsByRecipe = action.payload;
      })
      .addCase(fetchAverageRatingByRecipeId.pending, (state) => {
        state.averageRatingLoaded = false;
      })
      .addCase(fetchAverageRatingByRecipeId.fulfilled, (state, action) => {
        state.averageRatingLoaded = true;
        state.averageRatingByRecipe = action.payload;
      });
  },
});

export const selectReviewsByRecipe = (state) => state.review.reviewsByRecipe;
export const selectAverageRatingByRecipe = (state) =>
  state.review.averageRatingByRecipe;

export default reviewSlice.reducer;
