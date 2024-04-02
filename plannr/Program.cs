using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using plannr;
using plannr.Controllers;
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
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

    // Define security scheme for Bearer token
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "bearer", // Note: The Scheme value must be lowercase
        BearerFormat = "JWT"
    });

    // Add requirement to use security scheme for all endpoints
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var identityServerSettings = builder.Configuration.GetSection("IdentityServer").Get<IdentityServerSettings>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = identityServerSettings!.Authority;
        options.Audience = identityServerSettings!.Audience;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidTypes = new[] { "at+jwt" }
        };
    });

builder.Services
    .AddFluentEmail("your_email@your_domain.com")
    .AddMailGunSender("your_domain", "your_api_key");


var configuration = builder.Configuration;

builder.Services.Configure<SmtpSettings>(configuration.GetSection("SmtpSettings"));

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

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

