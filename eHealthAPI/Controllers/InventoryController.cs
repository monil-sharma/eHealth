using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using eHealthTotalAPI.DTOs;
using eHealthTotalAPI.Models;
using eHealthTotalAPI.Repository;
using Microsoft.AspNetCore.Mvc;

namespace eHealthTotalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;

        public InventoryController(IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("loadProducts")]
        public IActionResult GetAllProducts()
        {
            var products = _repository.getAllProducts();
            var productDTOs = _mapper.Map<IEnumerable<ProductDto>>(products);
            return Ok(productDTOs);
        }

        [HttpPost("saveProduct")]
//         public IActionResult SaveProduct(SaveProdModel prodModel)
//         {
//             var products = _repository.getAllProducts().ToList();
//             var search = products.FirstOrDefault(x => x.Name == prodModel.Name);
//             if (search != null)
//             {
//                 return BadRequest(new { message = "Product already exists" });
//             }

           
//  Product prod= new Product();
//             prod.Name=prodModel.Name;
//             prod.Price=prodModel.Price;
//             prod.CategoryId=prodModel.categoryId;
//             prod.Description=prodModel.Description;
//             prod.Image=prodModel.image;
//             prod.Stock=prodModel.stock;
//             return Ok(_repository.saveProduct(prod));
//         }

        public IActionResult SaveProduct(ProductDto productDto){
             var products = _repository.getAllProducts().ToList();
             var search = products.FirstOrDefault(x => x.Name == productDto.Name);
            if (search != null)
            {
                return BadRequest(new { message = "Product already exists" });
            }
            Product product= _mapper.Map<Product>(productDto);
            return Ok(_repository.saveProduct(product));
        }

        
        [HttpPut("updateProduct")]
        // public IActionResult UpdateProduct(Product prod){
        //     return Ok(_repository.updateProduct(prod));
        // }
        public IActionResult UpdateProduct(ProductDto productDto){
            var product= _mapper.Map<Product>(productDto);
            return Ok(_repository.updateProduct(product));
        }


        [HttpDelete("deleteProduct/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var result = _repository.deleteProduct(id);
            return Ok(result);
        }

        [HttpGet("searchProduct/{id}")]
        public IActionResult SearchProduct(int id)
        {
            var product = _repository.searchProduct(id);
            if (product == null)
            {
                return NotFound();
            }
            var productDTO = _mapper.Map<ProductDto>(product);
            return Ok(productDTO);
        }
    }


    public class SaveProdModel{
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public float Price { get; set; }
        
        public int categoryId { get; set; }
        
        public string image { get; set; }
        public int stock {get; set;}
    }
}