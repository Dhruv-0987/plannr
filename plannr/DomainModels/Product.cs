using System;
using System.ComponentModel.DataAnnotations;

namespace plannr.DomainModels
{
	public class Product
	{
        [Key]
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public string Category { get; set; }
        public string SubCategory { get; set; }
        public double PricePerUnit { get; set; }
        public string PriceUnit { get; set; } // e.g., "1L"
        public string Size { get; set; }      // e.g., "1L"

        // Nutrition information
        public double KJPer100g { get; set; }              // Kilojoules
        public double ProteinPer100g { get; set; }         // grams
        public double FatPer100g { get; set; }             // grams
        public double? TransFatPer100g { get; set; }       // grams, optional
        public double CarbohydratePer100g { get; set; }    // grams
        public double SodiumPer100g { get; set; }          // milligrams

        public Product()
        { }
		
	}
}

