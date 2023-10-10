using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using plannr.DatabaseContext;
using plannr.DomainModels;
using plannr.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace plannr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly PlannrDbContext _context;

        public EventsController(PlannrDbContext context)
        {
            _context = context;
        }

        // GET: api/Events
        [HttpGet("GetAllEvents")]
        public ActionResult<IEnumerable<Event>> GetEvents()
        {
            return _context.Events.ToList();
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public ActionResult<Event> GetEvent(int id)
        {
            var evt = _context.Events.Find(id);
            if (evt == null)
            {
                return NotFound();
            }

            return evt;
        }

        [HttpPost("AddEvent")]
        public ActionResult<Event> AddEvent(EventCreateDTO eventDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Convert Date and Time from DTO to a DateTime
            DateTime eventDateTime;
            if (!DateTime.TryParse($"{eventDto.Date} {eventDto.Time}", out eventDateTime))
            {
                return BadRequest("Invalid date and/or time format.");
            }

            // Create a new event object from the DTO
            Event evt = new Event
            {
                Title = eventDto.Title,
                Description = eventDto.Desc,
                Place = eventDto.Address,
                Time = eventDateTime  // This assumes your Event object has a DateTime property named EventDateTime
            };

            _context.Events.Add(evt);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetEvent), new { id = evt.Id }, evt);
        }

        // PUT: api/Events/5
        [HttpPut("{id}")]
        public IActionResult PutEvent(int id, Event evt)
        {
            if (id != evt.Id)
            {
                return BadRequest();
            }

            _context.Entry(evt).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public IActionResult DeleteEvent(int id)
        {
            var evt = _context.Events.Find(id);
            if (evt == null)
            {
                return NotFound();
            }

            _context.Events.Remove(evt);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

