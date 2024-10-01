using System;
using System.Collections.Generic;

namespace eHealthTotalAPI.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; }

    public double Price { get; set; }

    public int? CategoryId { get; set; }

    public int Stock { get; set; }

    public string Image { get; set; }
    

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual Category Category { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
}
