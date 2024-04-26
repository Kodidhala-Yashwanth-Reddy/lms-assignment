using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LeaveApplication_L_100_.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employee",
                columns: table => new
                {
                    EmpId = table.Column<int>(type: "int", nullable: false),
                    EmpName = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    EmpPhone = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true),
                    EmpEmail = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    EmpPassword = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    MngId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Employee__AF2DBB995C38AC5E", x => x.EmpId);
                });

            migrationBuilder.CreateTable(
                name: "LeaveRequest",
                columns: table => new
                {
                    EmpId = table.Column<int>(type: "int", nullable: false),
                    MngId = table.Column<int>(type: "int", nullable: true),
                    LevId = table.Column<int>(type: "int", nullable: true),
                    EmpName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    EmpPhone = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    ManagerName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    FromDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    ToDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    TotalDays = table.Column<int>(type: "int", nullable: true, computedColumnSql: "(datediff(day,[FromDate],[ToDate])+(1))", stored: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: "Pending")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__LeaveReq__AF2DBB9980E441EE", x => x.EmpId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employee");

            migrationBuilder.DropTable(
                name: "LeaveRequest");
        }
    }
}
