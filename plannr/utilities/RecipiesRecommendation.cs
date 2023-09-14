using System;
using plannr.DomainModels;

namespace plannr.utilities
{
    

    public class RecipiesRecommendation
	{

        public List<Recipe> RecommendRecipes(double budget, int numberOfPeople)
        {
            // Fetch from dbContext in the future

            List<Recipe> recipes = new List<Recipe>
        {
            new Recipe
            {
                Id = 0,
                RecipeTitle = "Spicy Mango Salad",
                Servings = 6,
                Protein = 0.79,
                Energy = 29.98,
                Carbohydrates = 8.52,
                TotalFats = 0.07,
                Ingredients = new List<string> { "Mango 4", "Lime Juice 1/4 cup", "Extra Virgin Olive Oil 2 tablespoons", "Red Pepper Flake 1 tablespoon", "Cilantro 2 tablespoons", "Shallot 2 tablespoons", "Salt Black Pepper to taste" },
                Instructions = new List<string> { "Place the mango cubes into a serving bowl. In a separate bowl whisk together the lime juice and olive oil. Season with red pepper flakes cilantro shallots salt and pepper. Whisk briefly then pour over the mangos. Stir to coat then cover and refrigerate for about 30 minutes to blend the flavors before serving." },
                ImageUrl = "https://images.media-allrecipes.com/userphotos/560x315/22476.jpg",
                Cost = 5.50,
                Cuisine = "Asian",
                Type = "Lunch"
            },
            new Recipe
            {
                Id = 1,
                RecipeTitle = "Greek Pasta with Tomatoes and White Beans",
                Servings = 4,
                Protein = 48.49,
                Energy = 1109.08,
                Carbohydrates = 183.6,
                TotalFats = 20.5,
                Ingredients = new List<string> { "Italian Tomato 2 cans", "Cannellini Bean 1 can", "Spinach 10 ounces", "Penne Pasta 8", "Feta Cheese 1/2" },
                Instructions = new List<string> { "Cook the pasta in a large pot of boiling salted water until al dente.", "Meanwhile combine tomatoes and beans in a large nonstick skillet. Bring to a boil over medium high heat. Reduce heat and simmer 10 minutes.", "Add spinach to the sauce cook for 2 minutes or until spinach wilts stirring constantly.", "Serve sauce over pasta and sprinkle with feta." },
                ImageUrl = "https://images.media-allrecipes.com/userphotos/560x315/960901.jpg",
                Cost = 10.50,
                Cuisine = "Mediterranean",
                Type = "Dinner"
            },
            new Recipe
            {
                Id = 2,
                RecipeTitle = "Chicken Delirious and Buttered Rice (for Pressure Cooker)",
                Servings = 8,
                Protein = 126.11,
                Energy = 3124.96,
                Carbohydrates = 531.8,
                TotalFats = 53.51,
                Ingredients = new List<string> { "Onion 2", "Green Bell Pepper 2", "Carrot 4", "Chicken Breast 1 pound", "Orange Juice 1 cup", "Whiskey 1 cup", "Brown Sugar 1 cup", "Vinegar 3/4 cup", "Red Pepper Flake 1 teaspoon", "Ginger 2 teaspoons", "Asian Sesame Oil 1 teaspoon", "Water 2 1/2 cups", "White Rice 1 1/4 cups", "Butter 1 tablespoon", "Orange Juice 1/2 cup", "Cornstarch 1 tablespoon" },
                Instructions = new List<string> { "Place onions green bell peppers and carrots in the pressure cooker add chicken. Whisk 1 cup orange juice whiskey brown sugar vinegar red pepper flakes ginger and sesame oil together in a bowl pour over chicken mixture. Stir to combine. Place lid on pressure cooker and lock bring to full pressure over medium heat until chicken is no longer pink in the center 15 minutes. Let pressure come down naturally about 15 minutes.", "While chicken is cooking combine water and rice in a microwavesafe casserole dish. Cook on high in microwave until water is absorbed and rice is tender 15 to 20 minutes. Stir butter into rice toss well.", "Whisk 1/2 cup orange juice and cornstarch together in a bowl stir into hot chicken mixture until whiskey sauce is thickened. Serve chicken over the hot buttered rice." },
                ImageUrl = "https://images.media-allrecipes.com/userphotos/560x315/1093109.jpg",
                Cost = 15.00,
                Cuisine = "American",
                Type = "Dinner"
            },
            new Recipe
            {
                Id = 3,
                RecipeTitle = "Green Beans with Cherry Tomatoes",
                Servings = 6,
                Protein = 23.23,
                Energy = 609.73,
                Carbohydrates = 77.31,
                TotalFats = 30.32,
                Ingredients = new List<string> { "Green Bean 1 1/2 pounds", "Water 1 1/2 cups", "Butter 1/4 cup", "Sugar 1 tablespoon", "Garlic Salt 3/4 teaspoon", "Pepper 1/4 teaspoon", "Basil 1 1/2 teaspoons", "Cherry Tomato Half 2 cups" },
                Instructions = new List<string> { "Place beans and water in a large saucepan. Cover and bring to a boil. Set heat to low and simmer until tender about 10 minutes. Drain off water and set aside.", "Melt butter in a skillet over medium heat. Stir in sugar garlic salt pepper and basil. Add tomatoes and cook stirring gently just until soft. Pour the tomato mixture over the green beans and toss gently to blend." },
                ImageUrl = "https://images.media-allrecipes.com/userphotos/560x315/874594.jpg",
                Cost = 7.50,
                Cuisine = "European",
                Type = "Side Dish"
            },
            new Recipe
            {
                Id = 4,
                RecipeTitle = "Italian Chicken with Pesto Potatoes",
                Servings = 4,
                Protein = 28.82,
                Energy = 1165.56,
                Carbohydrates = 148.77,
                TotalFats = 47.98,
                Ingredients = new List<string> { "Balsamic Vinegar 3/4 cup", "Chicken Breast Half 4", "Mozzarella Cheese 4 1/2 ounces", "Salt Pepper to taste", "Parma Ham 4 slices", "Cherry Tomato 1 pint", "Olive Oil 1 tablespoon", "Potato 1 pound", "Basil Pesto 2 tablespoons" },
                Instructions = new List<string> { "Preheat oven to 400 degrees F 200 degrees C.", "In a saucepan bring the vinegar to a boil. Reduce heat and simmer 15 minutes stirring frequently until thickened.", "Cut a pocket in each chicken breast. Fill each pocket with an equal amount of mozzarella cheese and season with salt and pepper. Wrap each chicken breast with a slice of ham. Arrange the wrapped chicken breasts in a baking dish. Place the tomatoes around the chicken sprinkle all with olive oil and season with salt and pepper.", "Bake 25 minutes in the preheated oven or until chicken is no longer pink and juices run clear.", "In a saucepan with enough lightly salted water to cover boil the potatoes 15 minutes or until tender. Drain return to the pan and coat with the pesto.", "Place chicken breasts tomatoes and potatoes on serving plates and drizzle with the reduced balsamic vinegar to serve." },
                ImageUrl = "https://images.media-allrecipes.com/userphotos/560x315/42278.jpg",
                Cost = 12.00,
                Cuisine = "Italian",
                Type = "Dinner"
            }
        };


            return recipes
                .Where(r => r.Cost <= budget && r.Servings >= numberOfPeople)
                .ToList();
        }

        public RecipiesRecommendation()
		{
		}
	}
}

