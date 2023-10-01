using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace plannr.Migrations
{
    /// <inheritdoc />
    public partial class ratingfeildchangedtodouble : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "RawRecipes");

            migrationBuilder.AlterColumn<double>(
                name: "Rating",
                table: "Reviews",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "Reviews",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "RawRecipes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
