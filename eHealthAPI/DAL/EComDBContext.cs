using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eHealthTotalAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace eHealthTotalAPI.DAL
{
    public class EComDBContext: DbContext
    {
        public EComDBContext(DbContextOptions dbContextOptions):base(dbContextOptions)
        {

        }

        public DbSet<User> users {get;set;}
        public DbSet<Product> products {get; set;}
    }
}