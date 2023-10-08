using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace plannr.Controllers
{
    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailController(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        [HttpPost("send")]
        public IActionResult SendEmail([FromBody] EmailRequest request)
        {
            try
            {
                using (var smtpClient = new SmtpClient(_smtpSettings.Server)
                {
                    Port = _smtpSettings.Port,
                    Credentials = new NetworkCredential(_smtpSettings.Email, _smtpSettings.Password),
                    EnableSsl = true,
                })
                {
                    string emailBody = "Here is your list of groceries:\n\n" +
                              string.Join("\n", request.Groceries.Select((item, index) => $"{index + 1}. {item}"));

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(_smtpSettings.Email),
                        Subject = request.Subject,
                        Body = emailBody,
                        IsBodyHtml = true,
                    };
                    mailMessage.To.Add(request.To);

                    smtpClient.Send(mailMessage);
                }

                return Ok("Email sent successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error sending email: {ex.Message}");
            }
        }
    }

    public class EmailRequest
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public List<string> Groceries { get; set; }
    }

    public class SmtpSettings
    {
        public string Server { get; set; }
        public int Port { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}


