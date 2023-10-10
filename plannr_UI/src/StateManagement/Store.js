// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './ProductSlice';
import RecipeReducer from './RecipeSlice';
import ReviewReducer from './ReviewSlice';
import EventReducer from './EventSlice';

const store = configureStore({
  reducer: {
    product: productReducer,
    recipe: RecipeReducer,
    review: ReviewReducer,
    event: EventReducer
  }
});

export default store;
