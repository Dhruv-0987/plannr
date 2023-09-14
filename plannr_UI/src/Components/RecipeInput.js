import React, { useState } from "react";

const possibleNumberOfPeople = [2, 4, 6, 8];
const possibleBudget = [100, 200, 300, 400];

function RecipeInput() {
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState(null);

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
                className={`w-20 p-2 border cursor-pointer 
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

        <div className="numberofpeople m-2 p-4 flex justify-center space-x-20 align-middle items-center w-full">
          <p className="text-xl flex-shrink-0 w-1/2 text-center">
            Number of People the recipe is for
          </p>
          <div className="flex w-1/2">
            {possibleNumberOfPeople.map((budget) => (
              <div
                key={budget}
                onClick={() => setNumberOfPeople(budget)}
                className={`w-20 p-2 border cursor-pointer 
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

        <div className="cuisine">
          <p className="font-playfair text-xl">
            What kind of cuisine would you like?
          </p>

          

        </div>
      </div>
    </div>
  );
}

export default RecipeInput;
