using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LeaveApplication_L_100_.Model;

[Table("Employee")]
public partial class Employee
{
    [Key]
    public int EmpId { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? EmpName { get; set; }

    [StringLength(20)]
    [Unicode(false)]
    public string? EmpPhone { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? EmpEmail { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? EmpPassword { get; set; }

    public int? MngId { get; set; }
}
