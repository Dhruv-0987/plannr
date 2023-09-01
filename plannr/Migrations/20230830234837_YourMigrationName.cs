using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace plannr.Migrations
{
    /// <inheritdoc />
    public partial class YourMigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SubCategory = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PricePerUnit = table.Column<double>(type: "float", nullable: false),
                    PriceUnit = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Size = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KJPer100g = table.Column<double>(type: "float", nullable: false),
                    ProteinPer100g = table.Column<double>(type: "float", nullable: false),
                    FatPer100g = table.Column<double>(type: "float", nullable: false),
                    TransFatPer100g = table.Column<double>(type: "float", nullable: true),
                    CarbohydratePer100g = table.Column<double>(type: "float", nullable: false),
                    SodiumPer100g = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
