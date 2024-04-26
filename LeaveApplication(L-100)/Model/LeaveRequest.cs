using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LeaveApplication_L_100_.Model;

[Table("LeaveRequest")]
public partial class LeaveRequest
{
    [Key]
    public int EmpId { get; set; }

    public int? MngId { get; set; }

    public int? LevId { get; set; }

    [StringLength(255)]
    public string? EmpName { get; set; }

    [StringLength(20)]
    public string? EmpPhone { get; set; }

    [StringLength(255)]
    public string? ManagerName { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? FromDate { get; set; }

    [Column(TypeName = "datetime")]
    public DateTime? ToDate { get; set; }

    public int? TotalDays { get; set; }

    public string? Reason { get; set; }

    [StringLength(20)]
    public string? Status { get; set; }
}
