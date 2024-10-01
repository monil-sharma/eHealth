using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eHealthTotalAPI.DTOs
{
    public class OrderDTO
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public int Amount { get; set; }
        public string? ProductName { get; set; }
        public decimal ProductPrice { get; set; }
    }
}