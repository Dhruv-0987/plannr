import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import { filterProductList } from "../StateManagement/ProductSlice";
import GroceryProductBar from "./GroceryProductBar";
//dummy data for vissualitzation
//TODO: remove this later

function SuggestionResults({ products }) {
  const [currentFilter, setCurrentFilter] = useState("All");

  console.log("product result",products);
  const dispatch = useDispatch();

  const foodTypeFilterList = [
    "All",
    "Bakery and Grains",
    "Dairy and Dairy Alternatives",
    "Fruit and Vegetables",
    "Meat and Seafood",
    "Pantry",
  ];

  const handleFilter = (category) => {
    dispatch(filterProductList(category));
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="flex flex-col mt-6">
        {foodTypeFilterList.map((foodType, index) => (
          <button
            key={index}
            className={`relative w-40 py-2 rounded-l-lg 
                     ${
                       foodType === currentFilter
                         ? "bg-green-600"
                         : "bg-brand-light-green"
                     } 
                     text-white hover:bg-green-600 focus:outline-none focus:bg-green-700 bookmark-btn`}
            onClick={() => {
              setCurrentFilter(foodType);
              handleFilter(foodType);
            }}
          >
            {foodType}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto h-[600px]">
        {products?.map((item, index) => {
          return <GroceryProductBar key={index} product={item} />;
        })}
      </div>
    </div>
  );
}

export default SuggestionResults;
