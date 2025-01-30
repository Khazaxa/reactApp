using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class DeleteCommentsCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Posts_PostId",
                table: "Comments");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 116, 124, 127, 251, 218, 227, 204, 211, 247, 49, 245, 252, 168, 190, 28, 223, 166, 181, 107, 99, 6, 16, 115, 23, 46, 98, 90, 72, 168, 211, 109, 133, 100, 214, 115, 143, 35, 111, 141, 46, 167, 223, 181, 246, 246, 122, 96, 237, 250, 85, 210, 74, 235, 192, 93, 35, 12, 93, 237, 38, 205, 183, 239, 167 }, new byte[] { 199, 253, 53, 174, 60, 219, 174, 193, 192, 232, 18, 225, 89, 103, 11, 242, 6, 81, 213, 196, 121, 243, 52, 74, 147, 232, 205, 169, 239, 233, 43, 245, 87, 250, 131, 141, 69, 147, 122, 249, 177, 180, 131, 115, 113, 60, 207, 13, 178, 204, 139, 227, 163, 179, 209, 246, 35, 22, 226, 230, 253, 218, 233, 225, 167, 252, 213, 198, 244, 231, 214, 121, 42, 207, 116, 133, 118, 222, 252, 120, 246, 106, 14, 127, 214, 136, 224, 86, 54, 130, 69, 12, 34, 67, 226, 147, 164, 137, 210, 107, 99, 202, 155, 221, 150, 84, 97, 165, 155, 36, 240, 188, 171, 136, 235, 62, 50, 30, 49, 54, 93, 208, 97, 151, 243, 3, 231, 252 } });

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Posts_PostId",
                table: "Comments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_Posts_PostId",
                table: "Comments");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 38, 52, 24, 109, 139, 221, 121, 123, 20, 43, 102, 125, 48, 66, 221, 48, 214, 95, 198, 99, 72, 137, 73, 69, 165, 194, 247, 237, 113, 239, 240, 188, 173, 193, 65, 48, 99, 199, 134, 228, 218, 32, 232, 175, 132, 51, 161, 169, 142, 3, 228, 254, 248, 121, 160, 24, 77, 176, 124, 198, 144, 36, 254, 50 }, new byte[] { 165, 46, 136, 206, 38, 217, 97, 160, 46, 52, 244, 179, 85, 110, 168, 231, 78, 249, 31, 72, 155, 96, 209, 148, 60, 97, 160, 174, 121, 212, 227, 255, 14, 165, 143, 69, 13, 157, 26, 118, 52, 40, 115, 121, 174, 165, 95, 113, 15, 46, 165, 208, 63, 123, 118, 49, 87, 252, 250, 222, 80, 107, 221, 161, 34, 245, 171, 245, 72, 248, 175, 34, 190, 171, 206, 118, 95, 224, 202, 79, 204, 246, 163, 253, 50, 210, 23, 56, 56, 50, 158, 223, 60, 15, 45, 145, 104, 7, 26, 206, 22, 83, 77, 249, 95, 180, 32, 210, 236, 178, 102, 84, 103, 190, 200, 191, 112, 225, 168, 138, 15, 144, 247, 36, 139, 115, 203, 76 } });

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_Posts_PostId",
                table: "Comments",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
