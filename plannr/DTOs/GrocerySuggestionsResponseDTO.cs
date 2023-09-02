using System;
using plannr.DomainModels;

namespace plannr.DTOs
{
	public class GrocerySuggestionsResponseDTO
	{
		public List<Product> Products { get; set; }

		public double TotalCost { get; set; }

		public GrocerySuggestionsResponseDTO()
		{
		}
	}
}

