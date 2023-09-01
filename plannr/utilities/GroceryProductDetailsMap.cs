using System;
using CsvHelper;
using CsvHelper.Configuration;
using plannr.DomainModels;

namespace plannr.utilities
{
	public class GroceryProductDetailsMap: ClassMap<Product>
	{
		public GroceryProductDetailsMap()
		{
            Map(m => m.ProductName).Name("Product");
            Map(m => m.Category).Name("Category");
            Map(m => m.SubCategory).Name("Sub_Category");
            Map(m => m.PricePerUnit).Name("Price Per 1000g or 1000mL or Each").TypeConverter<DollarConverter>();  // Assuming it's stored as a decimal or double in your Product model
            Map(m => m.Size).Name("Size (g, mL, Qty)");  // Assuming this is stored as a string or number
            Map(m => m.PriceUnit).Name("Unit");  // This might be the unit of the price, like "mL" in your given example
            Map(m => m.KJPer100g).Name("KJ (per 100g)");
            Map(m => m.ProteinPer100g).Name("Protein (g) per 100g");
            Map(m => m.FatPer100g).Name("Fat (g) per 100g");
            Map(m => m.CarbohydratePer100g).Name("Carbohydrate (g) per 100g");
            Map(m => m.SodiumPer100g).Name("Sodium (mg) per 100g").TypeConverter<LessThanConverter>();
        }
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

    public class LessThanConverter : CsvHelper.TypeConversion.DoubleConverter
    {
        public override object ConvertFromString(string text, IReaderRow row, MemberMapData memberMapData)
        {
            if (text.StartsWith("<"))
            {
                // If it starts with '<', strip the '<' and parse the remaining value.
                text = text.Replace("<", "").Trim();

                // Optionally, you can subtract a small value to ensure it's less than the given number.
                // e.g. '<5' becomes 4.9
                return double.Parse(text) - 0.1;
            }

            return base.ConvertFromString(text, row, memberMapData);
        }
    }

}

