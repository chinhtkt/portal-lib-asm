using Microsoft.EntityFrameworkCore.Migrations;

namespace Libary_asm.Migrations
{
    public partial class CreateDatabase4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Password", "RememberMe", "Role", "Username" },
                values: new object[] { 1, "123", false, 0, "chinhtkt" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1);
        }
    }
}
