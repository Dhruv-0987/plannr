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

        public string Name { get; set; }

        public string Minutes { get; set; }

        public string ContributerId { get; set; }

        private string TagsJson { get; set; }

        private string NutritionJson { get; set; }

        public int NumberOfSteps { get; set; }

        public int NumberOfIngradients { get; set; }

        private string StepsJson { get; set; }

        public string Desc { get; set; }

        private string IngredientsJson { get; set; }

        [NotMapped]
        public List<string> Tags
        {
            get => TagsJson == null ? null : JsonSerializer.Deserialize<List<string>>(TagsJson);
            set => TagsJson = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public List<string> Nutrition
        {
            get => NutritionJson == null ? null : JsonSerializer.Deserialize<List<string>>(NutritionJson);
            set => NutritionJson = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public List<string> Steps
        {
            get => StepsJson == null ? null : JsonSerializer.Deserialize<List<string>>(StepsJson);
            set => StepsJson = JsonSerializer.Serialize(value);
        }

        [NotMapped]
        public List<string> Ingredients
        {
            get => IngredientsJson == null ? null : JsonSerializer.Deserialize<List<string>>(IngredientsJson);
            set => IngredientsJson = JsonSerializer.Serialize(value);
        }

        public RawRecipe()
		{
			
		}
	}
}

