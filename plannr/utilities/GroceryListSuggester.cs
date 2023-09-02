using System;
using plannr.DomainModels;

namespace plannr.utilities
{
	public class GroceryListSuggester
	{
        private Dictionary<string, List<string>> stapleItems = new Dictionary<string, List<string>>
        {
            {"Bakery and Grains", new List<string>
                {
                    "Whole Wheat Bread",
                    "Brown Rice",
                    "Rolled Oats",
                    "Whole Wheat Pasta"
                }
            },
            {"Dairy and Dairy Alternatives", new List<string>
                {
                    "Milk",
                    "Eggs",
                    "Butter",
                    "Yogurt",
                    "Cheese",
                    "Almond Milk" // as an alternative for those who prefer or need it 
                }
            },
            {"Fruit and Vegetables", new List<string>
                {
                    "Potatoes",
                    "Onions",
                    "Tomatoes",
                    "Bananas",
                    "Apples",
                    "Broccoli",
                    "Carrots",
                    "Spinach",
                    "Bell Peppers"
                }
            },
            {"Meat and Seafood", new List<string>
                {
                    "Chicken Breast",
                    "Ground Beef",
                    "Tilapia",
                    "Tuna",
                    "Eggs" // Eggs are often classified under Dairy, but they can also be a source of protein in this category 
                }
            },
            {"Pantry", new List<string>
                {
                    "Olive Oil",
                    "Salt",
                    "Black Pepper",
                    "Sugar",
                    "Flour",
                    "Canned Beans",
                    "Peanut Butter",
                    "Canned Tomatoes",
                    "Chicken Stock"
                }
            }
        };

        public GroceryListSuggester()
		{
			
		}

        public List<Product> SuggestGroceries(List<Product> products, double budget, int familyMembers)
        {
            // Adjust the budget allocation based on family size
            double adjustedBudget = budget; // Could be adjusted with some logic based on family size

            Dictionary<string, double> budgetAllocation = new Dictionary<string, double>()
            {
                {"Bakery and Grains", 0.2 * adjustedBudget},
                {"Dairy and Dairy Alternatives", 0.2 * adjustedBudget},
                {"Fruit and Vegetables", 0.25 * adjustedBudget},
                {"Meat and Seafood", 0.25 * adjustedBudget},
                {"Pantry", 0.1 * adjustedBudget}
                // Adjust the budget splits based on your preferences or family size logic
            };

            List<Product> suggestedProducts = new List<Product>();
            Random rand = new Random();

            Dictionary<string, List<string>> productDict = products
                .GroupBy(p => p.Category)
                .ToDictionary(g => g.Key, g => g.Select(p => p.ProductName).ToList());

            // Assuming stapleItems is available in this context
            Dictionary<string, List<string>> stapleItems = this.stapleItems;

            foreach (var category in budgetAllocation.Keys)
            {
                double categoryBudget = budgetAllocation[category];

                var stapleCategoryProducts = new List<Product>();
                if (stapleItems.ContainsKey(category))
                {
                    stapleCategoryProducts = products
                        .Where(p => p.Category == category && stapleItems[category].Contains(p.ProductName))
                        .OrderByDescending(p => p.ProteinPer100g)
                        .ToList();
                }

                var otherCategoryProducts = products
                    .Where(p => p.Category == category && !stapleCategoryProducts.Contains(p))
                    .OrderBy(p => p.PricePerUnit)
                    .ToList();

                double spentBudget = 0;

                // Prioritize staple products first
                foreach (var product in stapleCategoryProducts)
                {
                    if (spentBudget + product.PricePerUnit <= categoryBudget)
                    {
                        suggestedProducts.Add(product);
                        spentBudget += product.PricePerUnit;
                    }
                }

                while (spentBudget < categoryBudget && otherCategoryProducts.Any())
                {
                    var randomProduct = otherCategoryProducts[rand.Next(otherCategoryProducts.Count)];

                    if (spentBudget + randomProduct.PricePerUnit <= categoryBudget)
                    {
                        suggestedProducts.Add(randomProduct);
                        spentBudget += randomProduct.PricePerUnit;
                    }

                    otherCategoryProducts.Remove(randomProduct); // Avoid suggesting the same product
                }
            }
            return suggestedProducts;
        }

    }


}

