using System;
namespace plannr.DTOs
{
	public class EventCreateDTO
	{
        public string Title { get; set; }
        public string Desc { get; set; }
        public string Address { get; set; }
        public string Date { get; set; }  // We'll expect this in a format like "2023-10-10"
        public string Time { get; set; }
        public EventCreateDTO()
		{
		}
	}
}

