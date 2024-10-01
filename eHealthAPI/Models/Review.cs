using System;
using System.Collections.Generic;

namespace eHealthTotalAPI.Models;

public partial class Review
{
    public int Id { get; set; }

    public int? CustomerId { get; set; }

    public int? ProductId { get; set; }

    public int? Rating { get; set; }

    public string? Content { get; set; }

    public DateTime? Date { get; set; }

    public virtual User? Customer { get; set; }

    public virtual Product? Product { get; set; }
}
