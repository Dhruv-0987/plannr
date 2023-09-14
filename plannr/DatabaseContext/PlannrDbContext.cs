using System;
using Microsoft.EntityFrameworkCore;
using plannr.DomainModels;

namespace plannr.DatabaseContext
{
    public class PlannrDbContext : DbContext
    {
        public PlannrDbContext(DbContextOptions<PlannrDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.ProductId)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<Recipe>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<RawRecipe> RawRecipes {get; set;}

        public DbSet<Recipe> Recipes { get; set; }
    }
}

