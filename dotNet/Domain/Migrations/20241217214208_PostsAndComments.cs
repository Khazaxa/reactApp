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
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsPublished = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
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
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PostId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Posts_PostId",
                        column: x => x.PostId,
                        principalTable: "Posts",
                        principalColumn: "Id");
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
                values: new object[] { new byte[] { 50, 180, 56, 166, 252, 250, 195, 120, 177, 61, 138, 61, 244, 109, 0, 76, 37, 153, 184, 251, 203, 142, 61, 104, 214, 192, 220, 139, 238, 229, 119, 166, 254, 93, 29, 220, 166, 66, 117, 218, 187, 211, 163, 12, 228, 49, 34, 203, 116, 217, 92, 65, 101, 217, 165, 15, 37, 220, 13, 152, 217, 21, 132, 38 }, new byte[] { 58, 96, 219, 131, 136, 72, 225, 253, 247, 83, 125, 190, 36, 105, 140, 14, 184, 24, 130, 153, 161, 153, 51, 218, 212, 2, 28, 83, 220, 240, 236, 23, 160, 124, 184, 54, 229, 88, 200, 164, 141, 29, 199, 32, 142, 109, 80, 255, 164, 163, 255, 164, 221, 247, 160, 254, 191, 91, 141, 159, 6, 248, 17, 101, 145, 130, 81, 54, 151, 38, 217, 115, 0, 147, 150, 183, 7, 97, 211, 156, 171, 176, 92, 107, 53, 52, 80, 147, 165, 86, 200, 19, 133, 66, 48, 112, 54, 176, 168, 133, 210, 154, 248, 133, 248, 216, 185, 25, 3, 58, 11, 36, 17, 36, 4, 87, 214, 3, 185, 143, 168, 251, 220, 183, 233, 185, 175, 96 } });

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
