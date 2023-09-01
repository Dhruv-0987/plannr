using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using plannr.DatabaseContext;
using plannr.DomainModels;
using plannr.DTOs;
using plannr.utilities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace plannr.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("PlannrPolicy")]
    [ApiController]
    public class SuggestionsController : Controller
    {
        private readonly PlannrDbContext _context;

        public SuggestionsController(PlannrDbContext context)
        {
            _context = context;
        }

        [HttpPost("suggestions")]
        public async Task<ActionResult<List<Product>>> GetSuggestedGroceries([FromBody] GrocerySuggestionsDTO request)
        {
            if (request.WeeklyBudget <= 0 || request.FamilySize <= 0)
            {
                return BadRequest("Weekly budget and family size must be positive values.");
            }

            // Fetch all products from the database
            List<Product> allProducts = await _context.Products.ToListAsync();

            // Create a dictionary from the list of products
            Dictionary<string, List<string>> productDict = allProducts
                .GroupBy(p => p.Category)
                .ToDictionary(g => g.Key, g => g.Select(p => p.ProductName).ToList());

            GroceryListSuggester suggester = new GroceryListSuggester();
            var suggestedProducts = suggester.SuggestGroceries(allProducts, request.WeeklyBudget, request.FamilySize);

            return Ok(suggestedProducts);
        }

    }
}

