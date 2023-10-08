import { createAsyncThunk } from "@reduxjs/toolkit";
import PlannrApiService from "../AppService";

export const fetchProducts = createAsyncThunk(
  "productlist/fetchProducts",
  async ({ budget, familySize }) => {
    const response = await PlannrApiService.getSuggestions(budget, familySize);
    return response.data;
  }
);

export const fetchAllIngredients = createAsyncThunk(
  "recipe/fetchAllIngredients",
  async () => {
    const res = await PlannrApiService.getAllIngredients();
    return res.data;
  }
);

export const fetchAggregateIngredients = createAsyncThunk(
  "recipe/fetchAggregateIngredients",
  async (recipeIds) => {
    const res = await PlannrApiService.getAggregateIngredients(recipeIds);
    return res.data;
  }
);

export const fetchAllCuisine = createAsyncThunk(
  "recipe/fetchAllCuisine",
  async () => {
    const res = await PlannrApiService.getAllCuisines();
    return res.data;
  }
);

export const fetchAllTypes = createAsyncThunk(
  "recipe/fetchAllTypes",
  async () => {
    const res = await PlannrApiService.getAllTypes();
    return res.data;
  }
);

export const fetchFilteredRecipes = createAsyncThunk(
  "recipe/fetchFilteredRecipes",
  async ({ budget, familySize, cuisines, ingredients, types }) => {
    const res = await PlannrApiService.getFilteredRecipes({
      budget,
      numberOfPeople: familySize, // renamed familySize to numberOfPeople
      cuisines,
      ingredients,
      types,
    });
    return res.data;
  }
);

export const fetchAllRecipes = createAsyncThunk(
  "recipe/fetchAllRecipes",
  async () => {
    const res = await PlannrApiService.getAllRecipes();
    return res.data;
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipe/fetchRecipeById",
  async (id) => {
    const res = await PlannrApiService.getRecipeById(id);
    return res.data;
  }
);

export const fetchReviewsByRecipeId = createAsyncThunk(
  "recipe/fetchReviewByRecipeId",
  async (recipeId) => {
    const res = await PlannrApiService.getReviewsByRecipeId(recipeId);
    return res.data;
  }
);

export const fetchAverageRatingByRecipeId = createAsyncThunk(
  "recipe/fetchAverageRatingByRecipeId",
  async (recipeId) => {
    const res = await PlannrApiService.getAverageRatingByRecipeId(recipeId);
    return res.data;
  }
);
