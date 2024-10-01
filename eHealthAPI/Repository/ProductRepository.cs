using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using eHealthTotalAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace eHealthTotalAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        EHealthTotalContext context;

        public ProductRepository(EHealthTotalContext _context)
        {
            context=_context;
        }
        public int deleteProduct(int id)
        {
            Product prod=context.Products.Where(x=>x.Id==id).FirstOrDefault();
            context.Products.Remove(prod);
            return context.SaveChanges();
        }

        public IEnumerable<Product> getAllProducts()
        {
            return context.Products.Include(p => p.Category).ToList();
        }

        public int saveProduct(Product prod)
        {
            context.Products.Add(prod);
            return context.SaveChanges();
        }

        public Product searchProduct(int id)
        {
            return context.Products.Find(id);
        }


        public int updateProduct(Product prod)
        {
            // Product uProd= context.Products.FirstOrDefault(x=>x.Id==prod.Id);
            // uProd.Name=prod.Name;
            // uProd.Price=prod.Price;
            // uProd.Image=prod.Image;
            // uProd.Description=prod.Description;
            // uProd.CategoryId=prod.CategoryId;
            
            // uProd.Stock=prod.Stock;
            context.Entry(prod).State = EntityState.Modified;
            
            return context.SaveChanges();
        }
    }
}