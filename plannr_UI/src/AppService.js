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

  async getAggregateIngredients(recipeIds) {
    return await axios.post(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/recipe/GetAggregatedIngredients`,
      recipeIds
    );
  },

  async getAllTypes() {
    return await axios.get(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/recipe/allRecipeTypes`
    );
  },

  async getFilteredRecipes({
    budget,
    numberOfPeople,
    cuisines,
    ingredients,
    types,
  }) {
    console.log("calling api", types);
    const numericBudget = parseFloat(budget);
    const reqBody = {
      Budget: budget,
      NumberOfPeople: numberOfPeople,
      Cuisines: cuisines,
      Ingredients: ingredients,
      FoodTypes: types,
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

  async getRecipeById(id) {
    return await axios.get(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/recipe/getRecipeById/${id}`
    );
  },

  async sendGroceryListEmail(to, subject, groceries) {
    const reqBody = {
      to: to,
      subject: subject,
      groceries: groceries
    };

    return await axios.post(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/Email/send`,
      reqBody
    );
  },

  async addRating(recipeId, ratings, comment) {
    const reqBody = {
      recipeId: recipeId,
      rating: ratings,
      comments: comment,
    };

    return await axios.post(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/Review/addReview`,
      reqBody
    );
  },

  async getReviewsByRecipeId(recipeId) {
    return await axios.get(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/Review/${recipeId}/reviews`
    );
  },

  async getAverageRatingByRecipeId(recipeId) {
    return await axios.get(
      `${process.env.REACT_APP_PLANNR_BASE_URL}/api/Review/${recipeId}/average-rating`
    );
  },
};

export default PlannrApiService;
