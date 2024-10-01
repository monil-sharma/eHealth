using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using eHealthTotalAPI.Models;
using eHealthTotalAPI.DTOs;

namespace eHealthTotalAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly EHealthTotalContext _context;
        private readonly IMapper _mapper;

        public OrdersController(EHealthTotalContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Orders
        [HttpGet("admin")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.Product)
                .Select(o => new OrderDTO
                {
                    Id = o.Id,
                    CustomerId = (int)o.CustomerId,
                    ProductId = (int)o.ProductId,
                    Quantity = (int)o.Quantity,
                    Date = (DateTime)o.Date,
                    Status = o.Status,
                    Amount = (int)o.Amount,
                    ProductName = o.Product.Name,
                    ProductPrice = (decimal)o.Product.Price
                })
                .ToListAsync();

            return Ok(orders);
        }

        // PUT: api/Orders/{id}/status
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] StatusUpdateDto statusUpdateDto)
        {
            var order = await _context.Orders.Include(o => o.Product).FirstOrDefaultAsync(o => o.Id == id);
            if (order == null)
            {
                return NotFound();
            }

            var previousStatus = order.Status;
            order.Status = statusUpdateDto.Status;

            // Update stock based on order status change
            var product = order.Product;

            if (previousStatus == "processing" && statusUpdateDto.Status == "cancelled" )
            {
                product.Stock += (int)order.Quantity;
            }
            else if (previousStatus == "cancelled" && statusUpdateDto.Status == "processing" )
            {
                if (product.Stock < order.Quantity)
                {
                    return BadRequest($"Insufficient stock for product {product.Name}. Available stock: {product.Stock}");
                }
                product.Stock -= (int)order.Quantity;
            }
            else if (previousStatus == "cancelled" && (statusUpdateDto.Status == "delivered" ||  statusUpdateDto.Status == "recieved"))
            {
                if (product.Stock < order.Quantity)
                {
                    return BadRequest($"Insufficient stock for product {product.Name}. Available stock: {product.Stock}. Invalid action cannot be performed");
                }
                product.Stock -= (int)order.Quantity;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Orders/customer/5
        [HttpGet("customer/{customerId}")]
        public async Task<ActionResult<IEnumerable<OrderDTO>>> GetOrdersByCustomerId(int customerId)
        {
            var orders = await _context.Orders
                .Where(o => o.CustomerId == customerId)
                .Include(o => o.Product)
                .Select(o => new OrderDTO
                {
                     Id = o.Id,
                    CustomerId = (int)o.CustomerId,
                    ProductId = (int)o.ProductId,
                    Quantity = (int)o.Quantity,
                    Date = (DateTime)o.Date,
                    Status = o.Status,
                    Amount = (int)o.Amount,
                    ProductName = o.Product.Name,
                    ProductPrice = (decimal)o.Product.Price
                })
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OrderDTO>> GetOrder(int id)
        {
            var order = await _context.Orders
                .Include(o => o.Product)
                .Where(o => o.Id == id)
                .Select(o => new OrderDTO
                {
                     Id = o.Id,
                    CustomerId = (int)o.CustomerId,
                    ProductId = (int)o.ProductId,
                    Quantity = (int)o.Quantity,
                    Date = (DateTime)o.Date,
                    Status = o.Status,
                    Amount = (int)o.Amount,
                    ProductName = o.Product.Name,
                    ProductPrice = (decimal)o.Product.Price
                })
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        // POST: api/Orders/place-orders
        [HttpPost("place-orders")] 
        public async Task<ActionResult<IEnumerable<OrderDTO>>> PlaceOrders(IEnumerable<OrderDTO> orderDtos)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var orders = _mapper.Map<IEnumerable<Order>>(orderDtos);

            foreach (var order in orders)
            {
                var product = await _context.Products.FindAsync(order.ProductId);

                if (product == null)
                {
                    return NotFound($"Product with ID {order.ProductId} not found.");
                }

                if (product.Stock < order.Quantity)
                {
                    return BadRequest($"Insufficient stock for product {product.Name}. Available stock: {product.Stock}");
                }

                product.Stock -= (int)order.Quantity;
                _context.Orders.Add(order);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrdersByCustomerId), new { customerId = orders.First().CustomerId }, _mapper.Map<IEnumerable<OrderDTO>>(orders));
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }

    public class StatusUpdateDto
    {
        public string Status { get; set; }
    }
}
