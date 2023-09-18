// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import RecipeReducer from './RecipeSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    recipe: RecipeReducer
  }
});

export default store;
