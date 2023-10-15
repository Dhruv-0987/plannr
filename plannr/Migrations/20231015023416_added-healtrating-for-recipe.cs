using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace plannr.Migrations
{
    /// <inheritdoc />
    public partial class addedhealtratingforrecipe : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "HealthRating",
                table: "RawRecipes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HealthRating",
                table: "RawRecipes");
        }
    }
}
