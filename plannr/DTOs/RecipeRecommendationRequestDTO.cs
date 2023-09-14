using System;
namespace plannr.DTOs
{
	public class RecipeRecommendationRequestDTO
	{
		public double Budget { get; set; }

		public int NumberOfPeople { get; set; }

		public List<string> Cuisines { get; set; }

		public List<string> Ingredients {get; set;}

		public RecipeRecommendationRequestDTO()
		{
		}
	}
}

