using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eHealthTotalAPI.DTOs
{
   // CartDto.cs
    public class CartDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int Quantity { get; set; }
        public string? CustomerName { get; set; }
        public string? ProductName { get; set; }
        public decimal? ProductPrice { get; set; }

        public int? Stock { get; set; }  
    }
}