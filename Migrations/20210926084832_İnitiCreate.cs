using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Todo.Migrations
{
    public partial class İnitiCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gorevs",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GorevTanimi = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    GorevTarihi = table.Column<DateTime>(type: "Date", nullable: false),
                    IsComplated = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gorevs", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Gorevs");
        }
    }
}
