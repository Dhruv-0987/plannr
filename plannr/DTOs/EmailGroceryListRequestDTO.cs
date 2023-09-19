using System;
namespace plannr.DTOs
{
	public class EmailGroceryListRequestDTO
	{
        public string Email { get; set; }
        public List<string> GroceryList { get; set; }
        public EmailGroceryListRequestDTO()
		{
		}
	}
}

