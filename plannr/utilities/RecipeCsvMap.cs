using System;
using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration;
using plannr.DomainModels;

namespace plannr.utilities
{
	public class RecipeCsvMap: ClassMap<RawRecipe>
	{
		public RecipeCsvMap()
		{
            Map(m => m.RecipeTitle).Name("Recipe Title");
            Map(m => m.Servings).Name("Servings");
            Map(m => m.Protein).Name("Protein (g)").TypeConverterOption.CultureInfo(CultureInfo.InvariantCulture);
            Map(m => m.Energy).Name("Energy (kCal)").TypeConverterOption.CultureInfo(CultureInfo.InvariantCulture);
            Map(m => m.Carbohydrates).Name("Carbohydrates (g)").TypeConverterOption.CultureInfo(CultureInfo.InvariantCulture);
            Map(m => m.TotalFats).Name("Total fats (g)").TypeConverterOption.CultureInfo(CultureInfo.InvariantCulture);
            Map(m => m.Cost).Name("Cost").TypeConverter<DollarConverter>();
            Map(m => m.Cuisine).Name("Cuisine");
            Map(m => m.Type).Name("MealType");
            Map(m => m.ImageUrl).Name("Image_url");

            // For the Ingredients and Instructions columns, since they're in JSON format in the CSV, 
            // we'll just map them to their corresponding JSON properties in the Recipe class
            Map(m => m.IngredientsJson).Name("Ingredient");
            Map(m => m.InstructionsJson).Name("Instructions");
        }

        public class DollarConverter : CsvHelper.TypeConversion.DoubleConverter
        {
            public override object ConvertFromString(string text, IReaderRow row, MemberMapData memberMapData)
            {
                // Remove the dollar sign before attempting to parse
                text = text.Replace("$", "").Trim();

                return base.ConvertFromString(text, row, memberMapData);
            }
        }
    }
}

