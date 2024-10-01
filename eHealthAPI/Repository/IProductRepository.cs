using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eHealthTotalAPI.Models;

namespace eHealthTotalAPI.Repository
{
    public interface IProductRepository
    {
        IEnumerable<Product> getAllProducts();

        int saveProduct(Product prod);

        int updateProduct(Product prod);

        int deleteProduct(int id);

        Product searchProduct(int id);
    }
}