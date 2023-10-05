import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAggregateIngredients,
  fetchAllCuisine,
  fetchAllIngredients,
  fetchAllRecipes,
  fetchAllTypes,
  fetchFilteredRecipes,
  fetchRecipeById,
} from "./Effects";

const initialState = {
  allIngredients: [],
  allCuisines: [],
  allTypes: [],
  recommendedRecipies: [],
  totalRecommendedRecipes: null,
  allRecipes: [],
  aggregateIngredients: [],
  isAggregateIngredientsLoaded: null,
  currentRecipeDetails: null,
  isCurrentRecipeDetailsLoaded: null,
  isIngredientsLoaded: null,
  isCuisineLoaded: null,
  isRecipesLoaded: null,
  isTypesLoaded: null,
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
      .addCase(fetchAllTypes.pending, (state) => {
        state.isTypesLoaded = false;
      })
      .addCase(fetchAllTypes.fulfilled, (state, action) => {
        state.allTypes = action.payload;
        state.isTypesLoaded = true;
      })
      .addCase(fetchAllIngredients.pending, (state) => {
        state.isIngredientsLoaded = false;
      })
      .addCase(fetchAllIngredients.fulfilled, (state, action) => {
        state.allIngredients = action.payload;
        state.isIngredientsLoaded = true;
      })
      .addCase(fetchAggregateIngredients.pending, (state) => {
        state.isAggregateIngredientsLoaded = false;
      })
      .addCase(fetchAggregateIngredients.fulfilled, (state, action) => {
        state.aggregateIngredients = action.payload;
        state.isAggregateIngredientsLoaded = true;
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
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.isCurrentRecipeDetailsLoaded = false;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.currentRecipeDetails = action.payload;
        state.isCurrentRecipeDetailsLoaded = true;
      });
  },
});

export const selectAllIngredients = (state) => state.recipe.allIngredients;
export const selectAggregateIngredients = (state) => state.recipe.aggregateIngredients;
export const selectAllCuisines = (state) => state.recipe.allCuisines;
export const selectFilteredRecipes = (state) =>
  state.recipe.recommendedRecipies;
export const selectAllRecipes = (state) => state.recipe.allRecipes;
export const selectCurrentRecipeDetails = (state) =>
  state.recipe.currentRecipeDetails;
export const selectIsRecipeLoaded = (state) => state.recipe.isRecipesLoaded;
export const selectAllTypes = (state) => state.recipe.allTypes;

export default recipeSlice.reducer;
