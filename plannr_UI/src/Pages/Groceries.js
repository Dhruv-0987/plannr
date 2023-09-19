import React from "react";
import GeneratedGroceries from "../Components/GeneratedGroceries";
import { useSelector } from "react-redux";
import { selectFilteredRecipes } from "../StateManagement/RecipeSlice";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Groceries() {
  const recipes = useSelector(selectFilteredRecipes);
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex items-center m-6 p-4">
        <IconButton onClick={() => {navigate('/recipy')}}>
          <ArrowBackIcon className="text-brand-green" />
        </IconButton>

        <p className="text-4xl ml-4 text-left font-playfair text-brand-green">
          Your Grocery List for your recipes...
        </p>
      </div>
      <hr className="border-t border-brand-green m-6 text-center" />
      <GeneratedGroceries recipes={recipes} />
    </div>
  );
}

export default Groceries;
