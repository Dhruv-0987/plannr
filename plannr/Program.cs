using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using plannr.DatabaseContext;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("PlannrPolicy",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod()
                          .AllowAnyHeader());
    options.AddPolicy("AllowSpecificOrigin",
            builder => builder
                             .AllowAnyMethod()
                             .AllowAnyHeader()
                             .AllowAnyOrigin());
    options.AddPolicy("VercelFrontendPolicy",
            builder =>
            {
                builder.WithOrigins("https://plannr-e6tc7qdo7-dhruv-0987.vercel.app/")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services
    .AddFluentEmail("your_email@your_domain.com")
    .AddMailGunSender("your_domain", "your_api_key");


var configuration = builder.Configuration;

builder.Services.AddDbContext<PlannrDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
      builder.AllowAnyOrigin() // adjust the origin accordingly
             .AllowAnyMethod()
             .AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

