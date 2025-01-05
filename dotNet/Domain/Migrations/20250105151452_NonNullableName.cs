using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class NonNullableName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                values: new object[] { new byte[] { 197, 124, 180, 27, 15, 192, 125, 132, 157, 151, 12, 110, 128, 141, 233, 202, 196, 38, 225, 52, 28, 83, 183, 130, 0, 136, 145, 201, 207, 151, 62, 164, 146, 199, 68, 67, 192, 76, 70, 1, 161, 97, 37, 48, 106, 188, 53, 9, 84, 166, 200, 38, 66, 140, 23, 152, 81, 81, 80, 64, 88, 78, 92, 255 }, new byte[] { 202, 102, 75, 110, 208, 204, 71, 104, 93, 34, 41, 205, 144, 21, 243, 164, 57, 104, 237, 247, 247, 249, 90, 145, 195, 240, 25, 230, 246, 100, 48, 222, 141, 254, 197, 64, 5, 218, 146, 215, 51, 19, 114, 108, 204, 220, 231, 116, 189, 78, 126, 85, 244, 109, 81, 199, 132, 180, 176, 164, 79, 139, 214, 139, 8, 25, 30, 127, 106, 255, 101, 7, 35, 186, 3, 65, 154, 152, 151, 237, 29, 137, 149, 219, 77, 17, 11, 151, 13, 242, 113, 21, 145, 194, 80, 220, 140, 213, 154, 96, 133, 159, 16, 78, 16, 218, 224, 33, 19, 211, 177, 4, 136, 97, 161, 160, 134, 74, 102, 70, 21, 178, 180, 123, 251, 20, 244, 227 } });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Name",
                table: "Users",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Name",
                table: "Users");

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
                values: new object[] { new byte[] { 67, 42, 34, 10, 197, 241, 107, 179, 41, 81, 214, 29, 246, 203, 207, 69, 158, 24, 77, 155, 12, 115, 197, 162, 228, 231, 224, 253, 224, 36, 205, 213, 225, 90, 74, 199, 108, 165, 104, 143, 117, 163, 49, 219, 133, 143, 47, 223, 149, 14, 194, 7, 180, 248, 111, 184, 83, 86, 76, 181, 223, 248, 88, 130 }, new byte[] { 187, 46, 135, 76, 30, 134, 31, 48, 33, 227, 105, 114, 67, 80, 173, 55, 210, 26, 192, 19, 7, 202, 136, 248, 106, 168, 13, 73, 190, 171, 135, 53, 22, 77, 35, 98, 83, 252, 131, 28, 244, 161, 207, 51, 41, 220, 20, 208, 246, 77, 77, 92, 36, 164, 107, 223, 112, 203, 19, 147, 208, 180, 113, 141, 134, 88, 13, 175, 88, 48, 7, 143, 55, 246, 134, 90, 19, 36, 89, 37, 151, 159, 25, 68, 26, 187, 254, 14, 139, 185, 4, 251, 93, 250, 151, 162, 151, 105, 110, 128, 214, 139, 148, 101, 63, 7, 75, 19, 172, 214, 226, 187, 68, 94, 209, 116, 142, 228, 62, 165, 244, 69, 140, 252, 211, 155, 212, 46 } });
        }
    }
}
