using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace plannr.DomainModels
{
	public class Review
	{
        [Key]
        public int Id { get; set; } // Primary Key for the Review

        [Required]
        [ForeignKey("RawRecipe")]
        public int RecipeId { get; set; } // Foreign Key to the Recipe

        [Required]
        [Range(1, 5)] // Assuming ratings are between 1 and 5
        public double Rating { get; set; }

        [MaxLength(1000)] // You can adjust this as per your requirements
        public string Comments { get; set; }

        public virtual RawRecipe RawRecipe { get; set; }
    }
}

