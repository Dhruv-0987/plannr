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
};

export default PlannrApiService;
