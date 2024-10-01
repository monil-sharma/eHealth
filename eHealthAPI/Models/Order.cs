using System;
using System.Collections.Generic;

namespace eHealthTotalAPI.Models;

public partial class Order
{
    public int Id { get; set; }

    public DateTime? Date { get; set; }

    public int? CustomerId { get; set; }

    public int? Amount { get; set; }

    public string? Status { get; set; }

    public int? ProductId { get; set; }

    public int? Quantity { get; set; }

    public virtual User? Customer { get; set; }

    public virtual Product? Product { get; set; }
}
