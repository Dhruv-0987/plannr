import React from "react";
import RecipeInput from "../Components/RecipeInput";
import RecipeResult from "../Components/RecipeResult";
import { useSelector } from "react-redux";
import { selectIsRecipeLoaded } from "../StateManagement/RecipeSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";

function Recipy() {
  const isRecipesLoaded = useSelector(selectIsRecipeLoaded);
  const navigate = useNavigate();

  return (
    <div className="relative recipy">
      <div className="absolute top-4 left-4">
        <IconButton onClick={() => {navigate('/')}}>
          <ArrowBackIcon className="text-brand-green" />
        </IconButton>
      </div>

      <div className="flex items-center align-middle justify-center m-10">
        <RecipeInput />
      </div>

      {isRecipesLoaded && (
        <div className="flex items-center align-middle justify-center m-10">
          <RecipeResult />
        </div>
      )}
    </div>
  );
}

export default Recipy;
