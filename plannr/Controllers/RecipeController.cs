
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
            var recipe = await _context.RawRecipes.FindAsync(id);

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
            _logger.LogInformation($"Received request: {JsonSerializer.Serialize(request)}");

            var response = new RecipeRecommendationResponseDTO();

            // Start with IQueryable right away
            IQueryable<RawRecipe> preliminaryQuery = _context.RawRecipes;

            if (request.Cuisines != null && request.Cuisines.Count > 0)
            {
                preliminaryQuery = preliminaryQuery.Where(r => request.Cuisines.Contains(r.Cuisine.ToLower().Trim()));
            }

            // After the above, preliminaryQuery is already an IQueryable, so you don't need to do AsQueryable() again.
            var potentialMatches = await preliminaryQuery.ToListAsync();

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
                        Ingredients = recipe.Ingredients,  
                        Instructions = recipe.Instructions
                    });

                    request.Budget -= recipe.Cost;
                }
            }

            // Finalize response
            response.Recipes = selectedRecipes;
            response.TotalRecipes = selectedRecipes.Count;

            if (response.TotalRecipes == 0)
            {
                return NotFound("No recipes found for the given criteria.");
            }

            return Ok(response);
        }

        [HttpGet("allIngredients")]
        public async Task<ActionResult<List<string>>> GetAllUniqueIngredients()
        {
            // Fetch all recipes
            var allRecipes = await _context.RawRecipes.ToListAsync();

            // Regular expression to match quantities and units
            var regex = new Regex(@"\s?\d+\s?/?\s?\d*\s?[a-zA-Z]*$");

            // Flatten the ingredients from all recipes and extract the main ingredient name, then get unique values
            var uniqueIngredients = allRecipes
                                        .SelectMany(r => r.Ingredients)
                                        .Select(ingredient =>
                                        {
                                            // Remove quantities and units using regex
                                            return regex.Replace(ingredient, "").Trim();
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

