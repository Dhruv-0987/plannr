import { createAsyncThunk } from "@reduxjs/toolkit";
import PlannrApiService from "../AppService";

export const fetchProducts = createAsyncThunk(
  "productlist/fetchProducts",
  async ({ budget, familySize }) => {
    const response = await PlannrApiService.getSuggestions(budget, familySize);
    return response.data; // Return the data directly from the response
  }
);
