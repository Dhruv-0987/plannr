using System;
using plannr.DomainModels;

namespace plannr.DTOs
{
	public class RecipeRecommendationResponseDTO
	{
        public List<RecipeResponseDTO> Recipes { get; set; }

		public int TotalRecipes { get; set; }

		public RecipeRecommendationResponseDTO()
		{

		}
    }
}

