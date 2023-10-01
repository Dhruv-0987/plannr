using System;
using System.ComponentModel.DataAnnotations;

namespace plannr.DTOs
{
	public class ReviewRequestDTO
	{
        [Required]
        public int RecipeId { get; set; }

        [Required]
        [Range(1, 5)]
        public double Rating { get; set; }

        [MaxLength(1000)]
        public string Comments { get; set; }
       
	}
}

