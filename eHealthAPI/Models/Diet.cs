using System;
using System.Collections.Generic;

namespace eHealthTotalAPI.Models;

public partial class Diet
{
    public int Id { get; set; }

    public string? PlanName { get; set; }

    public int? Protein { get; set; }

    public int? Fats { get; set; }

    public int? Carbs { get; set; }

    public int? Meal { get; set; }

    public string? Goal { get; set; }
}
