
using System.Globalization;
using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using plannr.DatabaseContext;
using plannr.DomainModels;
using plannr.DTOs;
using plannr.utilities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace plannr.Controllers
{
    [Route("api/recipe")]
    [ApiController]
    public class RecipeController : Controller
    {
        private readonly PlannrDbContext _context;

        public RecipeController(PlannrDbContext context)
        {
            _context = context;
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

        [HttpGet]
        public async Task<ActionResult<List<RawRecipe>>> GetAllRecipes()
        {
            var recipies = await _context.RawRecipes.ToListAsync();

            return recipies;
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

            var selectedRecipes = new List<RawRecipe>();
            double totalSpent = 0;

            foreach (var recipe in shuffledRecipes)
            {
                if ((totalSpent + recipe.Cost) <= budget) // Ensure we don't exceed budget
                {
                    selectedRecipes.Add(recipe);
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

            // Initial query
            var query = _context.RawRecipes.AsQueryable();

            // Filter by cuisine
            if (request.Cuisines != null && request.Cuisines.Count > 0)
            {
                query = query.Where(r => request.Cuisines.Contains(r.Cuisine.ToLower().Trim()));
            }

            // Filter by ingredients
            if (request.Ingredients != null && request.Ingredients.Count > 0)
            {
                foreach (var ingredient in request.Ingredients)
                {
                    var lowerIngredient = ingredient.ToLower().Trim();
                    query = query.Where(r =>
                        r.IngredientsJson != null &&
                        r.Ingredients.Contains(lowerIngredient)
                    );
                }
            }

            // Load potential matches into memory
            var potentialMatches = await query.ToListAsync();

            // Randomize and then filter by budget and servings
            var random = new Random();
            var selectedRecipes = new List<RawRecipe>();

            foreach (var recipe in potentialMatches.OrderBy(r => random.Next()))
            {
                if (recipe.Cost <= request.Budget && recipe.Servings >= request.NumberOfPeople)
                {
                    selectedRecipes.Add(recipe);
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

    }
}

