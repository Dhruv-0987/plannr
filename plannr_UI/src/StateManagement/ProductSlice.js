import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PlannrApiService from "../AppService";
import { fetchProducts } from "./Effects";

const initialState = {
  isProductsLoaded: false,
  allProducts: [],
  filteredProducts: [],
  totalCost: null,
};

const productSlice = createSlice({
  name: "productlist",
  initialState,
  reducers: {
    populateProductList: (state, action) => {
      state.allProducts = action.payload;
      state.filteredProducts = action.payload;
    },
    setIsProductLoaded: (state, action) => {
      state.isProductsLoaded = action.payload;
    },
    filterProductList: (state, action) => {
      const categoryToFilterBy = action.payload.trim().toLowerCase();
      if (categoryToFilterBy === "all") {
        state.filteredProducts = [...state.allProducts];
      } else {
        state.filteredProducts = state.allProducts.filter(
          (product) =>
            product.category.trim().toLowerCase() === categoryToFilterBy
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isProductsLoaded = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.allProducts = action.payload.products;
        state.filteredProducts = action.payload.products;
        state.totalCost = action.payload.totalCost;
        state.isProductsLoaded = true;
      });
  },
});

//exporting action
export const { populateProductList, setIsProductLoaded, filterProductList } =
  productSlice.actions;

// exporting selectors
export const selectAllProductList = (state) => state.product.allProducts;
export const selectFilteredProductList = (state) => state.product.filteredProducts;
export const selectIsProductLoaded = (state) => state.product.isProductsLoaded;
export const selectTotalCost  = (state) => state.product.totalCost;
//exporting the reducer
export default productSlice.reducer;
