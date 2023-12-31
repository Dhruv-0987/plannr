﻿
using System.Globalization;
using System.Text.RegularExpressions;
using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using plannr.DatabaseContext;
using plannr.DomainModels;
using plannr.DTOs;
using plannr.utilities;
using System.Text.Json;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace plannr.Controllers
{
    [Route("api/recipe")]
    [ApiController]
    public class RecipeController : Controller
    {
        private readonly PlannrDbContext _context;
        private readonly ILogger<RecipeController> _logger;
        private readonly IConfiguration _configuration;

        public RecipeController(PlannrDbContext context, ILogger<RecipeController> logger, IConfiguration configuration)
        {
            _context = context;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost("UploadRecipeData")]
        public async Task<IActionResult> ImportFromCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Please upload a CSV file.");
            }

            using var reader = new StreamReader(file.OpenReadStream());
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            csv.Context.RegisterClassMap<RecipeCsvMap>();

            var recipes = csv.GetRecords<RawRecipe>().ToList();
           
            // Assuming _context is your database context
            _context.RawRecipes.AddRange(recipes);
            await _context.SaveChangesAsync();

            return Ok("Data imported successfully");
        }

        [HttpGet("getAllRecipes")]
        public async Task<ActionResult<List<RawRecipe>>> GetAllRecipes()
        {
            var recipies = await _context.RawRecipes.ToListAsync();

            return recipies;
        }

        [HttpGet("getRecipeById/{id}")]
        public async Task<ActionResult<RecipeResponseDTO>> GetRecipe(int id)
        {
            var recipe = await _context.RawRecipes.Include(r => r.Reviews).FirstOrDefaultAsync(r => r.Id == id);

            if (recipe == null)
            {
                return NotFound();
            }

            double avgRating = (recipe.Reviews != null && recipe.Reviews.Any()) ? recipe.Reviews.Average(r => r.Rating) : 0;

            var recipeResponse = new RecipeResponseDTO
                {
                    Id = recipe.Id,
                    RecipeTitle = recipe.RecipeTitle,
                    Servings = recipe.Servings,
                    Protein = recipe.Protein,
                    Energy = recipe.Energy,
                    Carbohydrates = recipe.Carbohydrates,
                    TotalFats = recipe.TotalFats,
                    ImageUrl = recipe.ImageUrl,
                    Cost = recipe.Cost,
                    Cuisine = recipe.Cuisine,
                    Type = recipe.Type,
                    AverageRating = avgRating,
                    HealthRating = recipe.HealthRating,
                    Ingredients = recipe.Ingredients,  // Map Ingredients
                    Instructions = recipe.Instructions  // Map Instructions
                };

            return recipeResponse;
        }


        [HttpGet("recommendRecipes")]
        public async Task<ActionResult<RecipeRecommendationResponseDTO>> GetRecommendedRecipes(double budget, int numberOfPeople)
        {
            var response = new RecipeRecommendationResponseDTO();

            var recipes = await _context.RawRecipes
                .Where(r => r.Cost <= budget && r.Servings >= numberOfPeople) // Filtering based on budget and servings
                .OrderBy(r => r.Cost / r.Servings) // Ordering by cost-efficiency
                .ToListAsync();

            // Shuffle the list of recipes for randomization
            var random = new Random();
            var shuffledRecipes = recipes.OrderBy(r => random.Next()).ToList();

            var selectedRecipes = new List<RecipeResponseDTO>();
            double totalSpent = 0;

            foreach (var recipe in shuffledRecipes)
            {
                if ((totalSpent + recipe.Cost) <= budget) // Ensure we don't exceed budget
                {
                    double avgRating = (recipe.Reviews != null && recipe.Reviews.Any()) ? recipe.Reviews.Average(r => r.Rating) : 0;

                    selectedRecipes.Add(new RecipeResponseDTO
                    {
                        Id = recipe.Id,
                        RecipeTitle = recipe.RecipeTitle,
                        Servings = recipe.Servings,
                        Protein = recipe.Protein,
                        Energy = recipe.Energy,
                        Carbohydrates = recipe.Carbohydrates,
                        TotalFats = recipe.TotalFats,
                        ImageUrl = recipe.ImageUrl,
                        Cost = recipe.Cost,
                        Cuisine = recipe.Cuisine,
                        Type = recipe.Type,
                        AverageRating = avgRating,
                        HealthRating = recipe.HealthRating,
                        Ingredients = recipe.Ingredients,  // Map Ingredients
                        Instructions = recipe.Instructions  // Map Instructions
                    });

                    totalSpent += recipe.Cost;
                }
                if (totalSpent >= budget) break; // Stop if budget is exhausted
            }

            if (selectedRecipes.Count == 0)
            {
                return NotFound("No recipes found for the given criteria.");
            }

            response.Recipes = selectedRecipes;
            response.TotalRecipes = selectedRecipes.Count;

            return Ok(response);
        }

        [HttpPost("recommendFilteredRecipes")]
        public async Task<ActionResult<RecipeRecommendationResponseDTO>> GetRecommendedRecipes([FromBody] RecipeRecommendationRequestDTO request)
        { 
            var response = new RecipeRecommendationResponseDTO();

            // Start with IQueryable right away
            IQueryable<RawRecipe> preliminaryQuery = _context.RawRecipes;

            if (request.Cuisines != null && request.Cuisines.Count > 0)
            {
                preliminaryQuery = preliminaryQuery.Where(r => request.Cuisines.Contains(r.Cuisine.ToLower().Trim()));
            }

            if (request.FoodTypes != null && request.FoodTypes.Count > 0)
            {
                preliminaryQuery = preliminaryQuery.Where(r => request.FoodTypes.Contains(r.Type.ToLower().Trim()));
            }

            // After the above, preliminaryQuery is already an IQueryable, so you don't need to do AsQueryable() again.
            var potentialMatches = await preliminaryQuery.Include(r => r.Reviews).ToListAsync();

            // Filter by ingredients
            if (request.Ingredients != null && request.Ingredients.Count > 0)
            {
                potentialMatches = potentialMatches.Where(r =>
                    r.IngredientsJson != null &&
                    request.Ingredients.Any(ingredient =>
                    {
                        var primaryNames = GetPrimaryIngredientNames(ingredient);
                        return primaryNames.Any(pn => r.IngredientsJson.ToLower().Contains(pn));
                    })
                ).ToList();
            }

            // Randomize and then filter by budget and servings
            var random = new Random();
            var selectedRecipes = new List<RecipeResponseDTO>();

            foreach (var recipe in potentialMatches.OrderBy(r => random.Next()))
            {
                if (recipe.Cost <= request.Budget && recipe.Servings >= request.NumberOfPeople)
                {
                    double avgRating = (recipe.Reviews != null && recipe.Reviews.Any()) ? recipe.Reviews.Average(r => r.Rating) : 0;

                    selectedRecipes.Add(new RecipeResponseDTO
                    {
                        Id = recipe.Id,
                        RecipeTitle = recipe.RecipeTitle,
                        Servings = recipe.Servings,
                        Protein = recipe.Protein,
                        Energy = recipe.Energy,
                        Carbohydrates = recipe.Carbohydrates,
                        TotalFats = recipe.TotalFats,
                        ImageUrl = recipe.ImageUrl,
                        Cost = recipe.Cost,
                        Cuisine = recipe.Cuisine,
                        Type = recipe.Type,
                        AverageRating = avgRating,
                        HealthRating = recipe.HealthRating,
                        Ingredients = recipe.Ingredients,  
                        Instructions = recipe.Instructions
                    });

                    request.Budget -= recipe.Cost;
                }
            }

            // Finalize response
            response.Recipes = selectedRecipes;
            response.TotalRecipes = selectedRecipes.Count;

            return Ok(response);
        }

        [HttpGet("allIngredients")]
        public async Task<ActionResult<List<string>>> GetAllUniqueIngredients()
        {
            // Fetch all recipes
            var allRecipes = await _context.RawRecipes.ToListAsync();

            // Regular expression to match the start of quantities
            var regex = new Regex(@"\s?\d");

            // Flatten the ingredients from all recipes and extract the main ingredient name, then get unique values
            var uniqueIngredients = allRecipes
                                    .SelectMany(r => r.Ingredients)
                                    .Select(ingredient =>
                                    {
                                        // Find the position where the number starts using regex
                                        var match = regex.Match(ingredient);
                                        if (match.Success)
                                        {
                                            // Extract the part of the string before the number and trim it
                                            return ingredient.Substring(0, match.Index).Trim();
                                        }
                                        return ingredient.Trim();
                                    })
                                    .Distinct()
                                    .OrderBy(i => i)  // Optional: order alphabetically for better display in frontend
                                    .ToList();

            if (uniqueIngredients.Count == 0)
            {
                return NotFound("No ingredients found.");
            }

            return Ok(uniqueIngredients);
        }

        [HttpPost("GetAggregatedIngredients")]
        public async Task<ActionResult<IEnumerable<AggregateIngredientDTO>>> GetAggregatedIngredients([FromBody] List<int> recipeIds)
        {
            var allRecipes = await _context.RawRecipes.Where(r => recipeIds.Contains(r.Id)).ToListAsync();
            // Fetch all the ingredients based on the provided recipe IDs
            var ingredients = allRecipes
                .SelectMany(r => r.Ingredients)
                .ToList();

            // Object to store the aggregated ingredients
            var ingredientDict = new Dictionary<string, double>();

            foreach (var ingredient in ingredients)
            {
                var match = Regex.Match(ingredient, @"^(.*?)\s+(\d+)");
                if (match.Success)
                {
                    var name = match.Groups[1].Value.Trim();
                    var quantity = double.Parse(match.Groups[2].Value);

                    if (ingredientDict.ContainsKey(name))
                    {
                        ingredientDict[name] += quantity;
                    }
                    else
                    {
                        ingredientDict[name] = quantity;
                    }
                }
            }

            // Convert the dictionary to a list of DTOs for the response
            var result = ingredientDict.Select(kvp => new AggregateIngredientDTO
            {
                Name = kvp.Key,
                Quantity = kvp.Value
            }).ToList();

            return Ok(result);
        }


        [HttpGet("allCuisines")]
        public async Task<ActionResult<List<string>>> GetAllUniqueCuisines()
        {
            // Fetch distinct cuisines
            var uniqueCuisines = await _context.RawRecipes
                                                .Select(r => r.Cuisine)
                                                .Distinct()
                                                .OrderBy(c => c)  // Optional: order alphabetically for better display in frontend
                                                .ToListAsync();

            if (uniqueCuisines.Count == 0)
            {
                return NotFound("No cuisines found.");
            }

            return Ok(uniqueCuisines);
        }

        [HttpGet("allRecipeTypes")]
        public async Task<ActionResult<List<string>>> GetAllUniqueRecipeTypes()
        {
            // Fetch all distinct recipe types
            var allRecipeTypes = await _context.RawRecipes
                                               .Select(r => r.Type)
                                               .Distinct()
                                               .OrderBy(t => t)  // Optional: order alphabetically for better display in frontend
                                               .ToListAsync();

            if (!allRecipeTypes.Any())
            {
                return NotFound("No recipe types found.");
            }

            return Ok(allRecipeTypes);
        }


        [HttpDelete("deleteAllRecipes")]
        public async Task<ActionResult<bool>> DeleteAllRecipies()
        {
            try
            {
                // Fetch all the recipes
                var allRecipes = _context.RawRecipes;

                // Remove them from the context
                _context.RawRecipes.RemoveRange(allRecipes);

                // Save changes
                await _context.SaveChangesAsync();

                // Return a success message
                return Ok("All recipes have been deleted successfully.");
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "An error occurred while trying to delete all recipes.");

                // Return a server error
                return StatusCode(500, "Internal server error. Could not delete recipes.");
            }
        }

        

        private IEnumerable<string> GetPrimaryIngredientNames(string ingredient)
        {
            var parts = ingredient.Split(' ');
            yield return parts[0].ToLower().Trim();  // Return first word

            if (parts.Length > 1)
            {
                // Return combination of first two words
                yield return $"{parts[0].ToLower().Trim()} {parts[1].ToLower().Trim()}";
            }
        }
    }
}

