using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eHealthTotalAPI.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public int Stock { get; set; }

        public string Image { get; set; }

        public string CategoryName {get; set;}
        //categoryID add latest
        public int CategoryId {get; set;}
        
      
    }
}