using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace plannr.Migrations
{
    /// <inheritdoc />
    public partial class raw_recipe_updated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfIngradients",
                table: "RawRecipes");

            migrationBuilder.RenameColumn(
                name: "NumberOfSteps",
                table: "RawRecipes",
                newName: "Servings");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "RawRecipes",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "Minutes",
                table: "RawRecipes",
                newName: "RecipeTitle");

            migrationBuilder.RenameColumn(
                name: "Desc",
                table: "RawRecipes",
                newName: "InstructionsJson");

            migrationBuilder.RenameColumn(
                name: "ContributerId",
                table: "RawRecipes",
                newName: "IngredientsJson");

            migrationBuilder.AddColumn<double>(
                name: "Carbohydrates",
                table: "RawRecipes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Cost",
                table: "RawRecipes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "Cuisine",
                table: "RawRecipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Energy",
                table: "RawRecipes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "RawRecipes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "Protein",
                table: "RawRecipes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "TotalFats",
                table: "RawRecipes",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Carbohydrates",
                table: "RawRecipes");

            migrationBuilder.DropColumn(
                name: "Cost",
                table: "RawRecipes");

            migrationBuilder.DropColumn(
                name: "Cuisine",
                table: "RawRecipes");

            migrationBuilder.DropColumn(
                name: "Energy",
                table: "RawRecipes");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "RawRecipes");

            migrationBuilder.DropColumn(
                name: "Protein",
                table: "RawRecipes");

            migrationBuilder.DropColumn(
                name: "TotalFats",
                table: "RawRecipes");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "RawRecipes",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Servings",
                table: "RawRecipes",
                newName: "NumberOfSteps");

            migrationBuilder.RenameColumn(
                name: "RecipeTitle",
                table: "RawRecipes",
                newName: "Minutes");

            migrationBuilder.RenameColumn(
                name: "InstructionsJson",
                table: "RawRecipes",
                newName: "Desc");

            migrationBuilder.RenameColumn(
                name: "IngredientsJson",
                table: "RawRecipes",
                newName: "ContributerId");

            migrationBuilder.AddColumn<int>(
                name: "NumberOfIngradients",
                table: "RawRecipes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
