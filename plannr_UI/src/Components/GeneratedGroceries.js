import React, { useEffect, useState } from "react";
import Select from "react-select";
import EmailIcon from "@mui/icons-material/Email";
import Checkbox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";

const CustomOption = ({ innerProps, label, data }) => (
  <div
    {...innerProps}
    className="flex items-center p-2 hover:bg-gray-100 transition duration-200 ease-in rounded-md"
  >
    <img
      src={data.imageUrl}
      alt={label}
      width="40"
      className="mr-2 rounded-full border border-gray-200 shadow-sm"
    />
    <span className="text-gray-800">{label}</span>
  </div>
);

function GeneratedGroceries({ recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [filteredIngredients, setFilteredIngredients] = useState(
    recipes.flatMap((recipe) => recipe.ingredients)
  );
  const [groceriesToEmail, setGroceriesToEmail] = useState(filteredIngredients);

  const options = recipes.map((recipe) => ({
    value: recipe.id,
    label: recipe.recipeTitle,
    imageUrl: recipe.imageUrl,
  }));

  useEffect(() => {
    if (selectedRecipe) {
      const selected = recipes.find(
        (recipe) => recipe.id === selectedRecipe.value
      );
      setFilteredIngredients(selected.ingredients);
    } else {
      setFilteredIngredients(recipes?.flatMap((recipe) => recipe.ingredients));
    }
  }, [selectedRecipe]);

  const totalCalories = parseFloat(
    recipes
      .reduce(
        (acc, recipe) =>
          acc +
          (recipe.protein + recipe.totalFats) * 4 +
          recipe.carbohydrates * 9,
        0
      )
      .toFixed(2)
  );
  const uniqueCuisines = [...new Set(recipes.map((recipe) => recipe.cuisine))];
  const totalCost = parseFloat(
    recipes.reduce((acc, recipe) => acc + recipe.cost, 0).toFixed(2)
  );

  const handleCheckboxChange = (ingredient) => {
    if (groceriesToEmail.includes(ingredient)) {
      setGroceriesToEmail((prev) => prev.filter((item) => item !== ingredient));
    } else {
      setGroceriesToEmail((prev) => [...prev, ingredient]);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6 p-10 bg-white shadow-md rounded-sm m-6 overflow-clip">
      {/* Grocery List (3 columns) */}
      <div className="col-span-3 h-[600px] pr-4 border-r">
        <Select
          options={options}
          onChange={setSelectedRecipe}
          components={{
            Option: CustomOption,
          }}
          isClearable
          placeholder="Filter by Recipe"
          className="mb-4"
        />

        <div className="space-y-4 overflow-y-auto h-full p-2">
          {filteredIngredients.map((ingredient, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 border rounded"
            >
              <span className="p-2 text-xl text-brand-green font-lato">{ingredient}</span>
              <Checkbox
                color="default"
                inputProps={{ "aria-label": "select ingredient" }}
                sx={{
                  "&.MuiCheckbox-colorDefault.Mui-checked": {
                    color: green[500],
                  },
                }}
                onChange={() => handleCheckboxChange(ingredient)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Summary Info (1 column) */}
      <div className="col-span-1">
        {/* Display the total calories, cuisines, cost, and button here */}
        <div className="mb-4">Total Calories: {totalCalories} kcal</div>
        <div className="mb-4">Cuisines: {uniqueCuisines}</div>
        <div className="mb-4">Total Cost: AUD ${totalCost}</div>

        <div className="flex justify-center mt-4">
          <button className="flex items-center px-6 py-2 bg-brand-green text-white rounded">
            <EmailIcon className="mr-2" />
            Email Grocery List
          </button>
        </div>

        <p className="m-6 text-red-600">
          Select the ingredient you already have to omit it from the emailed
          list for Shopping.
        </p>
      </div>
    </div>
  );
}

export default GeneratedGroceries;
