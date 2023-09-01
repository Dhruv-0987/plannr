using System;
using plannr.DomainModels;

namespace plannr.utilities
{
	public class GroceryListSuggester
	{

		public GroceryListSuggester()
		{
			
		}

		public List<Product> SuggestGroceries(List<Product> products, double budget, int familyMembers)
		{
            Dictionary<string, double> budgetAllocation = new Dictionary<string, double>()
                {
                    {"Bakery and Grains", 0.2 * budget},
                    {"Dairy and Dairy Alternatives", 0.2 * budget},
                    {"Fruit and Vegetables", 0.25 * budget},
                    {"Meat and Seafood", 0.25 * budget},
                    {"Pantry", 0.1 * budget}
					// Adjust the budget splits based on your preferences
				};

            List<Product> suggestedProducts = new List<Product>();
            Random rand = new Random();

            Dictionary<string, List<string>> productDict = products
            .GroupBy(p => p.Category)
            .ToDictionary(g => g.Key, g => g.Select(p => p.ProductName).ToList());

            foreach (var category in budgetAllocation.Keys)
			{
                double categoryBudget = budgetAllocation[category];

                var categoryProducts = products
                    .Where(p => p.Category == category && productDict[category].Contains(p.ProductName))
                    .OrderBy(p => p.PricePerUnit)
                    .ToList();

				double spentBudget = 0;

                while (spentBudget < categoryBudget && categoryProducts.Any())
                {
                    var randomProduct = categoryProducts[rand.Next(categoryProducts.Count)];

                    if (spentBudget + randomProduct.PricePerUnit <= categoryBudget)
                    {
                        suggestedProducts.Add(randomProduct);
                        spentBudget += randomProduct.PricePerUnit;
                    }

                    categoryProducts.Remove(randomProduct); // Avoid suggesting the same product
                }
            }
			return suggestedProducts;
        }
    }
}

