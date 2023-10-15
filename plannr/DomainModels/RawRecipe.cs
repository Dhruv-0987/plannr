using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace plannr.DomainModels
{
	public class RawRecipe
	{
        [Key]
        public int Id { get; set; }
        public string RecipeTitle { get; set; }
        public int Servings { get; set; }
        public double Protein { get; set; }
        public double Energy { get; set; }
        public double Carbohydrates { get; set; }
        public double TotalFats { get; set; }
        public string ImageUrl { get; set; }
        public double Cost { get; set; }
        public string Cuisine { get; set; }
        public string Type { get; set; }
        public double HealthRating { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }

        [NotMapped]
        public List<string> Ingredients
        {
            get
            {
                try
                {
                    return string.IsNullOrEmpty(_ingredientsJson)
                        ? null
                        : JsonSerializer.Deserialize<List<string>>(_ingredientsJson);
                }
                catch (JsonException)
                {
                    // Handle or log the error as desired.
                    // For instance, return an empty list, or a list with an error message, or null.
                    return new List<string> { "Error parsing JSON" };
                }
            }
            set => _ingredientsJson = JsonSerializer.Serialize(value);
        }

        private string _ingredientsJson;  // backing field for IngredientsJson

        public string IngredientsJson
        {
            get => _ingredientsJson;
            set => _ingredientsJson = value;
        }

        [NotMapped]
        public List<string> Instructions
        {
            get
            {
                try
                {
                    return string.IsNullOrEmpty(_instructionsJson)
                        ? null
                        : JsonSerializer.Deserialize<List<string>>(_instructionsJson);
                }
                catch (JsonException)
                {
                    // Handle or log the error as desired.
                    // For instance, return an empty list, or a list with an error message, or null.
                    return new List<string> { "Error parsing JSON" };
                }
            }
            set => _instructionsJson = JsonSerializer.Serialize(value);
        }

        private string _instructionsJson;  // backing field for InstructionsJson

        public string InstructionsJson
        {
            get => _instructionsJson;
            set => _instructionsJson = value;
        }


        public RawRecipe()
		{
            Reviews = new List<Review>();
        }
	}
}

