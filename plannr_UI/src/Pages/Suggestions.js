import React, { useEffect, useState } from "react";
import SuggestionResults from "../Components/SuggestionResults";
import SuggestionsInput from "../Components/SuggestionsInput";
import { useSelector } from "react-redux";
import {
  selectIsProductLoaded,
  selectFilteredProductList,
  selectTotalCost,
} from "../StateManagement/ProductSlice";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Suggestions() {
  const products = useSelector(selectFilteredProductList);
  const isProductLoaded = useSelector(selectIsProductLoaded);
  const totalCost = useSelector(selectTotalCost);
  const navigate = useNavigate();

  console.log("products suggestions", products);

  const transformProducts = products?.map((product) => ({
    ...product,
    id: product.productId,
  }));

  const handleExploreOptions = () => {
    navigate("/");
  };

  return (
    <div className="suggestions bg-white bg-cover bg-center bg-no-repeat bg-fixed h-screen m-0">
      <div className="flex space-y-8 w-full mx-auto h-full items-center justify-center space-x-4">
        <div className="w-1/3 flex flex-col items-center justify-center align-middle h-full bg-brand-light-green">
          <div className="w-3/4 bg-white m-6 rounded-md">
            <SuggestionsInput />
          </div>

          <div
            className="w-1/2 p-4 flex justify-evenly items-center cursor-pointer"
            onClick={handleExploreOptions}
          >
            <p
              className="bg-white text-md rounded-lg shadow-md p-4 text-brand-green font-playfair
                 transform hover:scale-105 active:scale-95 transition-transform duration-300 hover:shadow-lg"
            >
              <ArrowBack className="m-2" />
              Explore More Options
            </p>
          </div>
        </div>

        <div className="w-3/4">
          <div className="m-4">
            <h1 className="text-6xl text-center mb-2 text-brand-light-green">
              Welcome Plannr
            </h1>
            <h2 className="text-4xl text-center text-brand-light-green">
              Start Creating Your Own Grocery List!!
            </h2>
          </div>

          {isProductLoaded && (
            <div className="border border-gray-300 shadow-md rounded-md p-4 w-3/4 mx-auto">
              <p className="text-brand-green text-2xl">
                Your Customized Shopping List
              </p>
              {<SuggestionResults products={transformProducts} />}

              <div>Total Cost: {totalCost}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
