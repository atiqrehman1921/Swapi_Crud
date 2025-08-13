using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class V2_Migration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StarshipResponse",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Count = table.Column<int>(type: "int", nullable: false),
                    Next = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Previous = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StarshipResponse", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Starships",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Model = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Manufacturer = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Cost_in_credits = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Length = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Max_atmosphering_speed = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Crew = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Passengers = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Cargo_capacity = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Consumables = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Hyperdrive_rating = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    MGLT = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Starship_class = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    StarshipResponseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Starships", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Starships_StarshipResponse_StarshipResponseId",
                        column: x => x.StarshipResponseId,
                        principalTable: "StarshipResponse",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Starships_StarshipResponseId",
                table: "Starships",
                column: "StarshipResponseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Starships");

            migrationBuilder.DropTable(
                name: "StarshipResponse");
        }
    }
}
