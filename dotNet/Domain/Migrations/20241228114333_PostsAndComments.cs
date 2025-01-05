using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class PostsAndComments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    AuthorId = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 67, 42, 34, 10, 197, 241, 107, 179, 41, 81, 214, 29, 246, 203, 207, 69, 158, 24, 77, 155, 12, 115, 197, 162, 228, 231, 224, 253, 224, 36, 205, 213, 225, 90, 74, 199, 108, 165, 104, 143, 117, 163, 49, 219, 133, 143, 47, 223, 149, 14, 194, 7, 180, 248, 111, 184, 83, 86, 76, 181, 223, 248, 88, 130 }, new byte[] { 187, 46, 135, 76, 30, 134, 31, 48, 33, 227, 105, 114, 67, 80, 173, 55, 210, 26, 192, 19, 7, 202, 136, 248, 106, 168, 13, 73, 190, 171, 135, 53, 22, 77, 35, 98, 83, 252, 131, 28, 244, 161, 207, 51, 41, 220, 20, 208, 246, 77, 77, 92, 36, 164, 107, 223, 112, 203, 19, 147, 208, 180, 113, 141, 134, 88, 13, 175, 88, 48, 7, 143, 55, 246, 134, 90, 19, 36, 89, 37, 151, 159, 25, 68, 26, 187, 254, 14, 139, 185, 4, 251, 93, 250, 151, 162, 151, 105, 110, 128, 214, 139, 148, 101, 63, 7, 75, 19, 172, 214, 226, 187, 68, 94, 209, 116, 142, 228, 62, 165, 244, 69, 140, 252, 211, 155, 212, 46 } });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AuthorId",
                table: "Comments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PostId",
                table: "Comments",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AuthorId",
                table: "Posts",
                column: "AuthorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 169, 162, 187, 64, 244, 129, 66, 189, 243, 17, 225, 183, 130, 65, 237, 247, 88, 27, 19, 207, 33, 40, 77, 97, 161, 35, 229, 227, 56, 243, 189, 164, 88, 75, 185, 7, 55, 45, 69, 102, 84, 235, 120, 93, 230, 104, 149, 224, 55, 107, 104, 87, 67, 121, 95, 33, 82, 8, 227, 63, 173, 97, 29, 68 }, new byte[] { 167, 187, 95, 229, 167, 166, 87, 138, 144, 9, 188, 184, 252, 178, 163, 229, 200, 7, 27, 209, 255, 245, 54, 51, 115, 211, 217, 11, 64, 178, 80, 170, 188, 27, 255, 121, 218, 12, 49, 194, 155, 57, 160, 216, 114, 235, 206, 212, 205, 45, 29, 94, 55, 81, 161, 229, 105, 13, 126, 243, 159, 100, 204, 15, 102, 95, 213, 217, 24, 34, 177, 164, 238, 238, 48, 107, 132, 205, 98, 192, 244, 87, 57, 113, 172, 73, 14, 163, 95, 245, 20, 44, 117, 121, 199, 68, 114, 78, 39, 24, 249, 196, 210, 245, 106, 163, 215, 212, 212, 104, 7, 1, 82, 196, 138, 231, 73, 229, 30, 59, 78, 85, 138, 225, 37, 54, 78, 64 } });
        }
    }
}
