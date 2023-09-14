using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace plannr.DomainModels
{
	public class Recipe
	{
        [Key]
        public int Id { get; set; }
        public string RecipeTitle { get; set; }
        public int Servings { get; set; }
        public double Protein { get; set; }
        public double Energy { get; set; }
        public double Carbohydrates { get; set; }
        public double TotalFats { get; set; }

        [NotMapped]
        public List<string> Ingredients
        {
            get => string.IsNullOrEmpty(_ingredientsJson) ? null : JsonSerializer.Deserialize<List<string>>(_ingredientsJson);
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
            get => string.IsNullOrEmpty(_instructionsJson) ? null : JsonSerializer.Deserialize<List<string>>(_instructionsJson);
            set => _instructionsJson = JsonSerializer.Serialize(value);
        }

        private string _instructionsJson;  // backing field for InstructionsJson

        public string InstructionsJson
        {
            get => _instructionsJson;
            set => _instructionsJson = value;
        }


        public string ImageUrl { get; set; }
        public double Cost { get; set; }
        public string Cuisine { get; set; }
        public string Type { get; set; }

        public Recipe()
		{
		}
	}
}

