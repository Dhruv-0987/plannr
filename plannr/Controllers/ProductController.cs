using System.Globalization;
using CsvHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using plannr.DatabaseContext;
using plannr.DomainModels;
using plannr.utilities;
using Microsoft.EntityFrameworkCore;
using plannr.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace plannr.Controllers
{
    [Route("api/product")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly PlannrDbContext _context;

        public ProductController(PlannrDbContext context)
        {
            _context = context;
        }

        [HttpPost("UploadCsv")]
        public IActionResult UploadCsv(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("File is not selected.");

            using var reader = new StreamReader(file.OpenReadStream());
            using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);

            csv.Context.RegisterClassMap<GroceryProductDetailsMap>();

            var products = csv.GetRecords<Product>().ToList();

            InsertDistinctProducts(products);

            return Ok("Data imported successfully");
        }
        
        [Authorize]
        [HttpGet("GetAllProducts")]
        public ActionResult<List<GetAllProductsDto>> GetAllProducts()
        {
            var random = new Random();
            var categories = new[] { "Fruits", "Vegetables", "Dairy", "Bakery", "Meats" };
            var subCategories = new[] { "Organic", "Non-Organic", "Gluten-Free", "Vegan" };
            var productNames = new[] { "Apples", "Bananas", "Carrots", "Milk", "Bread", "Chicken", "Beef", "Oranges", "Lettuce", "Cheese" };

            var products = Enumerable.Range(1, 10).Select(index => new GetAllProductsDto
            {
                ProductId = Guid.NewGuid().ToString(),
                ProductName = productNames[random.Next(productNames.Length)],
                Category = categories[random.Next(categories.Length)],
                SubCategory = subCategories[random.Next(subCategories.Length)],
                PricePerUnit = random.NextDouble() * 10 // Generates a random price between 0 and 10
            }).ToList();

            return Ok(products);
        }
        
        // public async Task<ActionResult<List<GetAllProductsDto>>> GetAllProducts()
        // {
        //     var products = await _context.Products.ToListAsync();
        //
        //     if (products == null || products.Count == 0)
        //     {
        //         return NotFound("No products found.");
        //     }
        //
        //     var response = products.Select(p => new GetAllProductsDto
        //     {
        //         ProductId = p.ProductId,
        //         ProductName = p.ProductName,
        //         Category = p.Category,
        //         SubCategory = p.SubCategory,
        //         PricePerUnit = p.PricePerUnit
        //     }).ToList();
        //
        //     return Ok(response);
        // }

        private void InsertDistinctProducts(List<Product> products)
        {
            // Assuming Product is the unique identifier, you can adjust as needed
            var distinctProducts = products
                .GroupBy(p => p.ProductName)
                .Select(g => g.First())
                .ToList();

            _context.AddRange(distinctProducts);
            _context.SaveChanges();
        }
    }
}

