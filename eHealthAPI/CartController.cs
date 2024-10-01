using AutoMapper;
using eHealthTotalAPI.DTOs;
using eHealthTotalAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eHealthTotalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly EHealthTotalContext _context;
        private readonly IMapper _mapper;

        public CartController(EHealthTotalContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Cart
        [HttpGet("{custid}")]
        public async Task<ActionResult<IEnumerable<CartDto>>> GetCarts(int custid)
        {
            // Include related Customer and Product data
            var carts = await _context.Carts
                .Include(c => c.Customer)
                .Include(c => c.Product).Where(c=>c.CustomerId==custid)
                .ToListAsync();

            var cartDtos = _mapper.Map<List<CartDto>>(carts);
            return Ok(cartDtos);
        }

        // GET: api/Cart/5
        [HttpGet("item/{id}")]
        public async Task<ActionResult<CartDto>> GetCart(int id)
        {
            var cart = await _context.Carts
                .Include(c => c.Customer)
                .Include(c => c.Product)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (cart == null)
            {
                return NotFound();
            }

            var cartDto = _mapper.Map<CartDto>(cart);
            return Ok(cartDto);
        }

        // PUT: api/Cart/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, CartDto cartDto)
        {
            if (id != cartDto.Id)
            {
                return BadRequest();
            }

            var cart = _mapper.Map<Cart>(cartDto);
            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cart
        [HttpPost]
        public async Task<ActionResult<Cart>> AddToCart(CartDto cartDto)
        {
            var product = await _context.Products.FindAsync(cartDto.ProductId);

            if (product == null)
            {
                return NotFound($"Product with ID {cartDto.ProductId} not found.");
            }

            if (product.Stock < cartDto.Quantity)
            {
                return BadRequest($"Insufficient stock for product {product.Name}. Available stock: {product.Stock}");
            }

            var cartItem = _mapper.Map<Cart>(cartDto);
            _context.Carts.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCart), new { id = cartItem.Id }, cartItem);
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Cart/clear/{customerId}
        [HttpDelete("clear/{customerId}")]
        public async Task<IActionResult> ClearCart(int customerId)
        {
            var cartItems = await _context.Carts.Where(c => c.CustomerId == customerId).ToListAsync();
            if (cartItems == null || !cartItems.Any())
            {
                return NotFound();
            }

            _context.Carts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.Id == id);
        }
    }
}
