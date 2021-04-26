using Microsoft.EntityFrameworkCore.Migrations;

namespace Libary_asm.Migrations
{
    public partial class CreateDatabase6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BorrowRequestId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "BorrowRequestId1",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_BorrowRequestId1",
                table: "Users",
                column: "BorrowRequestId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_BorrowRequests_BorrowRequestId1",
                table: "Users",
                column: "BorrowRequestId1",
                principalTable: "BorrowRequests",
                principalColumn: "BorrowRequestId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_BorrowRequests_BorrowRequestId1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_BorrowRequestId1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BorrowRequestId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BorrowRequestId1",
                table: "Users");
        }
    }
}
