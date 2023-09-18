import axios from "axios";

const PlannrApiService = {
  async getSuggestions(budget, familySize) {
    const reqBody = {
      weeklyBudget: budget,
      familySize: familySize,
    };
    return await axios.post(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/Suggestions/suggestions`,
      reqBody
    );
  },

  async getAllCuisines() {
    return await axios.get(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/recipe/allCuisines`
    );
  },

  async getAllIngredients() {
    return await axios.get(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/recipe/allIngredients`
    );
  },

  async getFilteredRecipes({ budget, numberOfPeople, cuisines, ingredients }) {
    console.log("calling api");
    const numericBudget = parseFloat(budget);
    const reqBody = {
      Budget: budget,
      NumberOfPeople: numberOfPeople,
      Cuisines: cuisines,
      Ingredients: ingredients,
    };
    console.log(reqBody);
    return await axios.post(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/recipe/recommendFilteredRecipes`,
      reqBody
    );
  },

  async getAllRecipes() {
    return await axios.get(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/recipe`
    );
  },
};

export default PlannrApiService;
