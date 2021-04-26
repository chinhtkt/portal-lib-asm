using Microsoft.EntityFrameworkCore.Migrations;

namespace Libary_asm.Migrations
{
    public partial class CreateDatabase10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_BorrowRequests_BorrowRequestId1",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_BorrowRequestId1",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BorrowRequestId1",
                table: "Users");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
    }
}
