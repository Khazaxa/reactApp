using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class UserAvatar1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "varchar(64)",
                maxLength: 64,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(64)",
                oldMaxLength: 64)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 4, 253, 138, 76, 225, 167, 161, 133, 39, 219, 101, 6, 185, 211, 243, 40, 103, 232, 207, 138, 75, 49, 213, 132, 24, 52, 17, 66, 148, 44, 124, 118, 117, 0, 249, 176, 41, 90, 162, 90, 248, 16, 126, 39, 106, 58, 183, 72, 44, 50, 137, 243, 68, 73, 179, 158, 138, 158, 254, 252, 96, 152, 138, 237 }, new byte[] { 154, 71, 162, 72, 94, 9, 102, 111, 159, 7, 51, 224, 80, 120, 51, 65, 201, 114, 219, 15, 178, 234, 249, 251, 45, 109, 18, 231, 207, 144, 87, 186, 166, 153, 131, 27, 230, 104, 152, 208, 251, 160, 250, 196, 159, 99, 56, 83, 76, 86, 144, 132, 134, 119, 85, 211, 196, 207, 54, 117, 195, 84, 114, 128, 116, 189, 165, 14, 73, 247, 177, 125, 195, 120, 166, 57, 60, 64, 154, 197, 144, 227, 1, 179, 145, 92, 165, 105, 48, 17, 156, 107, 200, 149, 217, 239, 18, 108, 42, 59, 32, 38, 35, 220, 219, 202, 100, 74, 31, 146, 136, 32, 54, 251, 82, 160, 69, 152, 236, 155, 26, 143, 95, 226, 140, 5, 207, 251 } });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Name",
                keyValue: null,
                column: "Name",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "varchar(64)",
                maxLength: 64,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(64)",
                oldMaxLength: 64,
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { new byte[] { 146, 241, 101, 90, 156, 51, 234, 97, 255, 214, 119, 25, 180, 191, 197, 235, 37, 143, 233, 94, 64, 56, 87, 127, 228, 190, 131, 214, 98, 203, 240, 176, 82, 50, 163, 85, 34, 159, 234, 123, 61, 174, 239, 64, 94, 82, 144, 254, 86, 85, 92, 9, 177, 10, 202, 178, 39, 194, 62, 49, 38, 165, 183, 97 }, new byte[] { 235, 20, 163, 166, 12, 186, 55, 20, 170, 204, 5, 226, 4, 61, 185, 90, 107, 177, 95, 122, 186, 192, 32, 247, 188, 254, 207, 86, 150, 25, 9, 85, 176, 84, 184, 72, 172, 203, 136, 195, 31, 111, 163, 50, 137, 23, 72, 251, 169, 39, 92, 142, 93, 227, 13, 180, 242, 129, 140, 202, 154, 32, 93, 254, 69, 187, 148, 198, 155, 117, 232, 168, 65, 235, 92, 197, 145, 220, 103, 2, 88, 20, 237, 229, 44, 68, 214, 74, 208, 102, 192, 104, 51, 142, 139, 201, 10, 36, 137, 25, 194, 174, 6, 55, 149, 147, 15, 211, 70, 61, 29, 184, 123, 226, 105, 63, 159, 25, 85, 16, 40, 155, 5, 172, 19, 149, 73, 187 } });
        }
    }
}
