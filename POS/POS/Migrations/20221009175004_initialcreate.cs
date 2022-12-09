using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace POS.Migrations
{
    public partial class initialcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_role",
                columns: table => new
                {
                    role_id = table.Column<long>(type: "bigint", nullable: false),
                    role_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_role", x => x.role_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_store",
                columns: table => new
                {
                    store_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    store_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    store_description = table.Column<string>(type: "text", nullable: true),
                    store_logo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    store_created_at = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_store", x => x.store_id);
                });

            migrationBuilder.CreateTable(
                name: "tbl_category",
                columns: table => new
                {
                    category_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    category_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    category_created_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    fk_store_id = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_category", x => x.category_id);
                    table.ForeignKey(
                        name: "FK_tbl_category_tbl_store_fk_store_id",
                        column: x => x.fk_store_id,
                        principalTable: "tbl_store",
                        principalColumn: "store_id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_record",
                columns: table => new
                {
                    record_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    total_amount_per_slip = table.Column<int>(type: "int", nullable: true),
                    record_created_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    fk_store_id = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_record", x => x.record_id);
                    table.ForeignKey(
                        name: "FK_tbl_record_tbl_store_fk_store_id",
                        column: x => x.fk_store_id,
                        principalTable: "tbl_store",
                        principalColumn: "store_id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_user",
                columns: table => new
                {
                    user_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    user_email_phone = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    user_password = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: true),
                    user_created_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    user_approved = table.Column<bool>(type: "bit", nullable: true),
                    user_verification_code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    user_email_status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    fk_role_id = table.Column<long>(type: "bigint", nullable: true),
                    fk_store_id = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_user", x => x.user_id);
                    table.ForeignKey(
                        name: "FK_tbl_user_tbl_role_fk_role_id",
                        column: x => x.fk_role_id,
                        principalTable: "tbl_role",
                        principalColumn: "role_id");
                    table.ForeignKey(
                        name: "FK_tbl_user_tbl_store_fk_store_id",
                        column: x => x.fk_store_id,
                        principalTable: "tbl_store",
                        principalColumn: "store_id");
                });

            migrationBuilder.CreateTable(
                name: "tbl_product",
                columns: table => new
                {
                    product_id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    product_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    product_price = table.Column<int>(type: "int", nullable: true),
                    product_available_quantity = table.Column<int>(type: "int", nullable: true),
                    product_created_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    fk_category_id = table.Column<long>(type: "bigint", nullable: true),
                    fk_store_id = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_product", x => x.product_id);
                    table.ForeignKey(
                        name: "FK_tbl_product_tbl_category_fk_category_id",
                        column: x => x.fk_category_id,
                        principalTable: "tbl_category",
                        principalColumn: "category_id");
                    table.ForeignKey(
                        name: "FK_tbl_product_tbl_store_fk_store_id",
                        column: x => x.fk_store_id,
                        principalTable: "tbl_store",
                        principalColumn: "store_id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_category_fk_store_id",
                table: "tbl_category",
                column: "fk_store_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_product_fk_category_id",
                table: "tbl_product",
                column: "fk_category_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_product_fk_store_id",
                table: "tbl_product",
                column: "fk_store_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_record_fk_store_id",
                table: "tbl_record",
                column: "fk_store_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_store_store_name",
                table: "tbl_store",
                column: "store_name",
                unique: true,
                filter: "[store_name] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_user_fk_role_id",
                table: "tbl_user",
                column: "fk_role_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_user_fk_store_id",
                table: "tbl_user",
                column: "fk_store_id");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_user_user_email_phone",
                table: "tbl_user",
                column: "user_email_phone",
                unique: true,
                filter: "[user_email_phone] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_product");

            migrationBuilder.DropTable(
                name: "tbl_record");

            migrationBuilder.DropTable(
                name: "tbl_user");

            migrationBuilder.DropTable(
                name: "tbl_category");

            migrationBuilder.DropTable(
                name: "tbl_role");

            migrationBuilder.DropTable(
                name: "tbl_store");
        }
    }
}
