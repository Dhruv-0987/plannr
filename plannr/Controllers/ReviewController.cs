using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using plannr.DatabaseContext;
using plannr.DomainModels;
using plannr.DTOs;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace plannr.Controllers
{
    [Route("api/[controller]")]
    public class ReviewController : Controller
    {
        private readonly PlannrDbContext _context; // Adjust this with the actual name of your DbContext

        public ReviewController(PlannrDbContext context)
        {
            _context = context;
        }

        [HttpPost("addReview")]
        public async Task<IActionResult> AddRating([FromBody] ReviewRequestDTO reviewDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if the recipe exists
            var recipeExists = await _context.RawRecipes.AnyAsync(r => r.Id == reviewDto.RecipeId);
            if (!recipeExists)
            {
                return NotFound(new { Message = "Recipe not found" });
            }

            var review = new Review
            {
                RecipeId = reviewDto.RecipeId,
                Rating = reviewDto.Rating,
                Comments = reviewDto.Comments
            };

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Rating added successfully", Review = review });
        }

        [HttpGet("{recipeId}/average-rating")]
        public async Task<ActionResult<double>> GetAverageRating(int recipeId)
        {
            // Check if the recipe exists
            var recipeExists = await _context.RawRecipes.AnyAsync(r => r.Id == recipeId);
            if (!recipeExists)
            {
                return NotFound("Recipe not found");
            }

            // Calculate the average rating
            var averageRating = await _context.Reviews
                .Where(r => r.RecipeId == recipeId)
                .AverageAsync(r => (double?)r.Rating) ?? 0.0;

            return Ok(averageRating);
        }

        [HttpGet("{recipeId}/reviews")]
        public async Task<ActionResult<List<Review>>> GetReviewsForRecipe(int recipeId)
        {
            // Check if the recipe exists
            var recipeExists = await _context.RawRecipes.AnyAsync(r => r.Id == recipeId);
            if (!recipeExists)
            {
                return NotFound("Recipe not found");
            }

            // Fetch the reviews for the specified recipe
            var reviews = await _context.Reviews
                .Where(r => r.RecipeId == recipeId)
                .ToListAsync();

            return Ok(reviews);
        }
    }
}

