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

export const fetchAllCuisine = createAsyncThunk(
  "recipe/fetchAllCuisine",
  async () => {
    const res = await PlannrApiService.getAllCuisines();
    return res.data;
  }
);

export const fetchFilteredRecipes = createAsyncThunk(
  "recipe/fetchFilteredRecipes",
  async ({ budget, familySize, cuisines, ingredients }) => {
    const res = await PlannrApiService.getFilteredRecipes({
      budget,
      numberOfPeople: familySize, // renamed familySize to numberOfPeople
      cuisines,
      ingredients,
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
