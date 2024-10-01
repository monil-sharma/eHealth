// ProductService.cs

using System.Collections.Generic;
using System.Linq;

namespace eHealthTotalAPI.Services
{
    public class ProductService
    {
        private static List<_Product> _products = new List<_Product>
        {
            new _Product { Id = 1, Name = "Product A", Price = 10.99m },
            new _Product { Id = 2, Name = "Product B", Price = 20.99m }
            // Add more products as needed
        };

        public _Product GetProductById(int id)
        {
            return _products.FirstOrDefault(p => p.Id == id);
        }

        // Add other methods as needed, such as GetAllProducts, UpdateProduct, etc.
    }

    public class _Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
