import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllCuisine,
  fetchAllIngredients,
  fetchFilteredRecipes,
} from "../StateManagement/Effects";
import {
  selectAllCuisines,
  selectAllIngredients,
} from "../StateManagement/RecipeSlice";
import Select from "react-select";

const possibleNumberOfPeople = [2, 4, 6, 8];
const possibleBudget = [100, 200, 300, 400];
const popularCuisines = [
  "Indian",
  "Thai",
  "Chinese",
  "Italian",
  "American",
  "Australian",
  "Greek",
  "Vietnamese",
];

function RecipeInput() {
  const dispatch = useDispatch();

  const [selectedBudget, setSelectedBudget] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [currentSelectedIngredient, setCurrentSelectedIngredient] =
    useState(null);
  const [budgetErrorMsg, setBudgetErrorMsg] = useState(null);
  const [numberOfPeopleErrMsg, setNumberOfPeopleErrMsg] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const allCuisines = useSelector(selectAllCuisines);
  const allIngredients = useSelector(selectAllIngredients);

  useEffect(() => {
    dispatch(fetchAllCuisine());
    dispatch(fetchAllIngredients());
  }, [dispatch]);

  const displayedCuisines = allCuisines.filter((cuisine) =>
    popularCuisines.includes(cuisine)
  );

  const ingredientOptions = allIngredients.map((ingredient) => ({
    value: ingredient,
    label: ingredient,
  }));

  const handleCuisineClick = (cuisine) => {
    setSelectedCuisines((prev) => {
      if (prev.includes(cuisine)) {
        return prev.filter((c) => c !== cuisine);
      } else {
        return [...prev, cuisine];
      }
    });
  };

  const handleRecipeRecommendation = () => {
    if (validateInputs()) {
      dispatch(
        fetchFilteredRecipes({
          budget: selectedBudget,
          familySize: numberOfPeople,
          cuisines: selectedCuisines,
          ingredients: selectedIngredients,
        })
      );
    }
  };

  const handleToggleFilters = () => {
    setShowAdvancedFilters((prev) => !prev);
  };

  const handleIngredientSelect = (option) => {
    setCurrentSelectedIngredient(option.value);
    if (!selectedIngredients.includes(option.value)) {
      setSelectedIngredients((prevIngredients) => [
        ...prevIngredients,
        option.value,
      ]);
    }
  };

  const removeSelectedIngredient = (ingredient) => {
    setSelectedIngredients((prevIngredients) =>
      prevIngredients.filter((ing) => ing !== ingredient)
    );
  };

  function validateInputs() {
    let isValidBudget = true;
    let isValidNumberOfPeople = true;

    // Validate selectedBudget
    if (
      selectedBudget === null ||
      typeof selectedBudget !== "number" ||
      selectedBudget <= 0
    ) {
      setBudgetErrorMsg("Please provide a valid budget.");
      isValidBudget = false;
    } else {
      setBudgetErrorMsg(null);
    }

    // Validate numberOfPeople
    if (
      numberOfPeople === null ||
      typeof numberOfPeople !== "number" ||
      numberOfPeople <= 0
    ) {
      setNumberOfPeopleErrMsg("Please provide a valid number of people.");
      isValidNumberOfPeople = false;
    } else {
      setNumberOfPeopleErrMsg(null);
    }
    return isValidBudget && isValidNumberOfPeople;
  }

  return (
    <div className="recipe w-3/4 border-white shadow-md p-6">
      <p className="font-playfair text-3xl">
        What kind of recipes would you like?
      </p>

      <div className="flex flex-col items-center space-y-8">
        <div className="numberofpeople m-2 p-4 flex justify-center space-x-20 align-middle items-center w-full">
          <p className="text-xl flex-shrink-0 w-1/2 text-center">Your budget</p>
          <div className="flex w-1/2">
            {possibleBudget.map((budget) => (
              <div
                key={budget}
                onClick={() => setSelectedBudget(budget)}
                className={`w-full p-2 border cursor-pointer 
          transition-all duration-300 ease-in-out ${
            selectedBudget === budget
              ? "bg-brand-green text-white"
              : "bg-gray-100"
          }`}
              >
                {budget}
              </div>
            ))}
          </div>
        </div>

        {budgetErrorMsg && (
          <div className="text-center text-red-800 text-md ">
            {budgetErrorMsg}
          </div>
        )}

        <div className="numberofpeople m-2 p-4 flex justify-center space-x-20 align-middle items-center w-full">
          <p className="text-xl flex-shrink-0 w-1/2 text-center">
            Number of People the recipe is for
          </p>
          <div className="flex w-1/2">
            {possibleNumberOfPeople.map((people) => (
              <div
                key={people}
                onClick={() => setNumberOfPeople(people)}
                className={`w-full p-2 border cursor-pointer 
          transition-all duration-300 ease-in-out ${
            numberOfPeople === people
              ? "bg-brand-green text-white"
              : "bg-gray-100"
          }`}
              >
                {people}
              </div>
            ))}
          </div>
        </div>

        {numberOfPeopleErrMsg && (
          <div className="text-center text-red-800 text-md ">
            {numberOfPeopleErrMsg}
          </div>
        )}

        {showAdvancedFilters && (
          <div className="ingredients m-2 p-4 flex justify-center space-x-20 align-middle items-center w-full">
            <p className="text-xl flex-shrink-0 w-1/2 text-center">
              Ingredients you have
            </p>
            <div className="flex w-1/2">
              <Select
                options={ingredientOptions}
                value={currentSelectedIngredient}
                onChange={handleIngredientSelect}
                placeholder="Select or type an ingredient..."
                isSearchable={true}
                className="text-gray-700 w-full"
              />
            </div>
          </div>
        )}

        {selectedIngredients.length > 0 && showAdvancedFilters && (
          <div className="mt-4">
            {selectedIngredients.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center bg-brand-green text-white rounded-full px-3 py-1 text-sm mr-2 mb-2"
              >
                {ingredient}
                <button
                  className="ml-2 text-white"
                  onClick={() => removeSelectedIngredient(ingredient)}
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="cuisine">
          <p className="font-playfair text-xl">
            What kind of cuisine would you like?
          </p>
          <div className="flex flex-wrap gap-4 m-4">
            {displayedCuisines.map((cuisine) => (
              <div
                key={cuisine}
                onClick={() => handleCuisineClick(cuisine)}
                className={`cursor-pointer p-4 border rounded-lg transition-all duration-300 ease-in-out  ${
                  selectedCuisines.includes(cuisine)
                    ? "bg-brand-green text-white"
                    : "bg-gray-200"
                }`}
              >
                {cuisine}
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleRecipeRecommendation}
          className="mt-6 px-6 py-2 bg-brand-green text-white rounded-lg shadow-md hover:bg-brand-green-darker transition-transform transform duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-green-lighter active:bg-brand-green-dark active:scale-95"
        >
          Get Recipe Recommendation
        </button>

        <div
          className={`text-md cursor-pointer underline ${
            showAdvancedFilters ? "text-emerald-900" : "text-emerald-700"
          } text-left`}
          onClick={handleToggleFilters}
        >
          <p>
            {showAdvancedFilters
              ? "Hide Advanced Filtering"
              : "Show Advanced Filtering"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default RecipeInput;
