using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace plannr.Migrations
{
    /// <inheritdoc />
    public partial class addedRatingsToRecipe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "RawRecipes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "RawRecipes");
        }
    }
}
