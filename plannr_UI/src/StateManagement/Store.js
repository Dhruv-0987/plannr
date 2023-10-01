// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import RecipeReducer from './RecipeSlice';
import ReviewReducer from './ReviewSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    recipe: RecipeReducer,
    review: ReviewReducer
  }
});

export default store;
