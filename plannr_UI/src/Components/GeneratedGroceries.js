import React, { useEffect, useState } from "react";
import Select from "react-select";
import EmailIcon from "@mui/icons-material/Email";
import Checkbox from "@mui/material/Checkbox";
import { green, grey } from "@mui/material/colors";
import TextField from "@mui/material/TextField";
import PlannrApiService from "../AppService";
import { toast } from "react-toastify";

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

  const aggregateIngredients = (recipes) => {
    let ingredientDict = {};

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        const match = ingredient.match(/^(.*?)\s+(\d+)/);
        if (match) {
          let name = match[1].trim();
          let quantity = parseFloat(match[2]);
          if (ingredientDict[name]) {
            ingredientDict[name] += quantity;
          } else {
            ingredientDict[name] = quantity;
          }
        }
      });
    });

    return Object.entries(ingredientDict).map(
      ([name, quantity]) => `${name} ${quantity}`
    );
  };

  const [filteredIngredients, setFilteredIngredients] = useState(
    aggregateIngredients(recipes)
  );

  const [openEmailInput, setOpenEmailInput] = useState(false);
  const [groceriesToEmail, setGroceriesToEmail] = useState([]);
  const [emailConfirmationMsg, setEmailConfirmationMsg] = useState(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState(null);
  const [reciverEmail, setReciverEmail] = useState("");

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
      // If the ingredient already exists in the list, remove it
      setGroceriesToEmail((prev) => prev.filter((item) => item !== ingredient));
    } else {
      // Otherwise, add the checked ingredient to the list
      setGroceriesToEmail((prev) => [...prev, ingredient]);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setReciverEmail(value);

    // Basic email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(value)) {
      setEmailErrorMsg("Invalid email format");
    } else {
      setEmailErrorMsg("");
    }
  };

  const handleSendEmail = () => {
    if(emailErrorMsg){
      toast.error("Email format not proper please enter again")
      return
    }
    const emailGroceriesList = filteredIngredients.filter(
      (ingredient) => !groceriesToEmail.includes(ingredient)
    );
    PlannrApiService.sendGroceryListEmail(
      reciverEmail,
      "Here are you groceries for the week",
      emailGroceriesList
    )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Email Sent Succesfully");
        } else {
          toast.error("Email Could Not be send Try Again");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="grid grid-cols-4 gap-6 p-10 bg-white shadow-md rounded-sm m-6 overflow-clip">
      {/* Grocery List (3 columns) */}

      <div className="col-span-3 h-[600px] pr-4 border-r">
        <p className="m-2 text-brand-green text-left text-lg">
          *Select the ingredient you already have to omit it from the emailed
          list for Shopping.
        </p>

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
              className="flex items-center justify-between p-2 border rounded shadow-md"
            >
              <span className="p-2 text-xl text-brand-green font-lato">
                {ingredient}
              </span>
              <Checkbox
                color="default"
                checked={groceriesToEmail.includes(ingredient)}
                sx={{
                  "&.MuiCheckbox-colorDefault.Mui-checked": {
                    color: "red", // Adjust the color to red when checked
                  },
                }}
                inputProps={{ "aria-label": "select ingredient" }}
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

        <div className="m-4">
          <TextField
            label="Email"
            variant="outlined"
            value={reciverEmail}
            onChange={handleEmailChange}
            error={!!emailErrorMsg}
            helperText={emailErrorMsg}
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="transition-transform transform scale-100 hover:scale-95 active:scale-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green flex items-center px-6 py-2 bg-brand-green text-white rounded"
            onClick={handleSendEmail}
          >
            <EmailIcon className="mr-2" />
            Email Grocery List
          </button>
        </div>

        {emailConfirmationMsg && (
          <div>
            <p className="text-center text-blue-500 m-6">
              {emailConfirmationMsg}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default GeneratedGroceries;
