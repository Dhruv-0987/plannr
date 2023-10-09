using System;
using System.ComponentModel.DataAnnotations;

namespace plannr.DomainModels
{
	public class Event
	{
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [StringLength(500)]
        public string Description { get; set; }

        [Required]
        public string Place { get; set; } // This is the human-readable address

        [StringLength(255)] // Length can be adjusted based on Place ID length
        public string PlaceId { get; set; } // Unique identifier from Google Places API

        public double Latitude { get; set; } // Latitude of the place

        public double Longitude { get; set; } // Longitude of the place

        public DateTime Time { get; set; }

        public int NumberOfPeopleAttending { get; set; }
	}
}

