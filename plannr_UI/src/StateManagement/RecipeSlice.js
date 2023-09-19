import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllCuisine,
  fetchAllIngredients,
  fetchAllRecipes,
  fetchFilteredRecipes,
} from "./Effects";

const initialState = {
  allIngredients: [],
  allCuisines: [],
  recommendedRecipies: [],
  totalRecommendedRecipes: null,
  allRecipes: [],
  isIngredientsLoaded: null,
  isCuisineLoaded: null,
  isRecipesLoaded: null,
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCuisine.pending, (state) => {
        state.isCuisineLoaded = false;
      })
      .addCase(fetchAllCuisine.fulfilled, (state, action) => {
        state.allCuisines = action.payload;
        state.isCuisineLoaded = true;
      })
      .addCase(fetchAllIngredients.pending, (state) => {
        state.isIngredientsLoaded = false;
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action) => {
        state.allIngredients = action.payload;
        state.isIngredientsLoaded = true;
      })
      .addCase(fetchFilteredRecipes.pending, (state) => {
        state.isRecipesLoaded = false;
      })
      .addCase(fetchFilteredRecipes.fulfilled, (state, action) => {
        state.recommendedRecipies = action.payload.recipes;
        state.totalRecommendedRecipes = action.payload.totalRecipes;
        state.isRecipesLoaded = true;
      })
      .addCase(fetchAllRecipes.pending, (state) => {
        state.isRecipesLoaded = false;
      })
      .addCase(fetchAllRecipes.fulfilled, (state, action) => {
        state.allRecipes = action.payload;
        state.isRecipesLoaded = true;
      });
  },
});

export const selectAllIngredients = (state) => state.recipe.allIngredients;
export const selectAllCuisines = (state) => state.recipe.allCuisines;
export const selectFilteredRecipes = (state) => state.recipe.recommendedRecipies;
export const selectAllRecipes = (state) => state.recipe.allRecipes;
export const selectIsRecipeLoaded = (state) => state.recipe.isRecipesLoaded;

export default recipeSlice.reducer;
