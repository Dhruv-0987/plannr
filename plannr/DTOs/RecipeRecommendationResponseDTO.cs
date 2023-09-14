using System;
using plannr.DomainModels;

namespace plannr.DTOs
{
	public class RecipeRecommendationResponseDTO
	{
        public List<RawRecipe> Recipes { get; set; }

		public int TotalRecipes { get; set; }

		public RecipeRecommendationResponseDTO()
		{

		}
    }
}

