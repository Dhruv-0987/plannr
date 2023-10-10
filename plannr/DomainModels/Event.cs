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

        public DateTime Time { get; set; }

        public int NumberOfPeopleAttending { get; set; }
	}
}

