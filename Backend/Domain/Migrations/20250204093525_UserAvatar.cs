using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class UserAvatar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvatarImageId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "AvatarImageId", "PasswordHash", "PasswordSalt" },
                values: new object[] { null, new byte[] { 146, 241, 101, 90, 156, 51, 234, 97, 255, 214, 119, 25, 180, 191, 197, 235, 37, 143, 233, 94, 64, 56, 87, 127, 228, 190, 131, 214, 98, 203, 240, 176, 82, 50, 163, 85, 34, 159, 234, 123, 61, 174, 239, 64, 94, 82, 144, 254, 86, 85, 92, 9, 177, 10, 202, 178, 39, 194, 62, 49, 38, 165, 183, 97 }, new byte[] { 235, 20, 163, 166, 12, 186, 55, 20, 170, 204, 5, 226, 4, 61, 185, 90, 107, 177, 95, 122, 186, 192, 32, 247, 188, 254, 207, 86, 150, 25, 9, 85, 176, 84, 184, 72, 172, 203, 136, 195, 31, 111, 163, 50, 137, 23, 72, 251, 169, 39, 92, 142, 93, 227, 13, 180, 242, 129, 140, 202, 154, 32, 93, 254, 69, 187, 148, 198, 155, 117, 232, 168, 65, 235, 92, 197, 145, 220, 103, 2, 88, 20, 237, 229, 44, 68, 214, 74, 208, 102, 192, 104, 51, 142, 139, 201, 10, 36, 137, 25, 194, 174, 6, 55, 149, 147, 15, 211, 70, 61, 29, 184, 123, 226, 105, 63, 159, 25, 85, 16, 40, 155, 5, 172, 19, 149, 73, 187 } });

            migrationBuilder.CreateIndex(
                name: "IX_Users_AvatarImageId",
                table: "Users",
                column: "AvatarImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Images_AvatarImageId",
                table: "Users",
                column: "AvatarImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Images_AvatarImageId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_AvatarImageId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "AvatarImageId",
                table: "Users");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 116, 124, 127, 251, 218, 227, 204, 211, 247, 49, 245, 252, 168, 190, 28, 223, 166, 181, 107, 99, 6, 16, 115, 23, 46, 98, 90, 72, 168, 211, 109, 133, 100, 214, 115, 143, 35, 111, 141, 46, 167, 223, 181, 246, 246, 122, 96, 237, 250, 85, 210, 74, 235, 192, 93, 35, 12, 93, 237, 38, 205, 183, 239, 167 }, new byte[] { 199, 253, 53, 174, 60, 219, 174, 193, 192, 232, 18, 225, 89, 103, 11, 242, 6, 81, 213, 196, 121, 243, 52, 74, 147, 232, 205, 169, 239, 233, 43, 245, 87, 250, 131, 141, 69, 147, 122, 249, 177, 180, 131, 115, 113, 60, 207, 13, 178, 204, 139, 227, 163, 179, 209, 246, 35, 22, 226, 230, 253, 218, 233, 225, 167, 252, 213, 198, 244, 231, 214, 121, 42, 207, 116, 133, 118, 222, 252, 120, 246, 106, 14, 127, 214, 136, 224, 86, 54, 130, 69, 12, 34, 67, 226, 147, 164, 137, 210, 107, 99, 202, 155, 221, 150, 84, 97, 165, 155, 36, 240, 188, 171, 136, 235, 62, 50, 30, 49, 54, 93, 208, 97, 151, 243, 3, 231, 252 } });
        }
    }
}
