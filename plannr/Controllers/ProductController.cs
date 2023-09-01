using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using CsvHelper;
using Microsoft.AspNetCore.Mvc;
using plannr.DatabaseContext;
using plannr.DomainModels;
using plannr.utilities;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace plannr.Controllers
{
    [Route("api/[controller]")]
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

        [HttpGet("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _context.Products.ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }

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

