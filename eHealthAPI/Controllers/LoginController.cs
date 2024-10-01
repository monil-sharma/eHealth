using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using eHealthTotalAPI.DTOs;
using eHealthTotalAPI.Models;
using eHealthTotalAPI.Repository;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace eHealthTotalAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;

        public LoginController(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("loadData")]
        public IActionResult GetAllUsers()
        {
            var users = _repository.getAllUsers();
            var userDTOs = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(userDTOs);
        }

        
        [HttpPost("register")]
        public IActionResult SaveUser(RegisterModel user){
            
           List<User> users= _repository.getAllUsers().ToList();
           User search=users.Find(t=>t.Email==user.Email);
           if(search!=null){
            return BadRequest("Email exists");
           }
           else{
            // User u= new User();
            
            // u.Name=user.Name;
            // u.Email=user.Email;
            // u.Password=user.Password;
            // u.Address=user.Address;
            // u.Phone=user.Phone;

            var us=_mapper.Map<User>(user);
           
            return Ok(_repository.saveUser(us));
            }
        }

        
        [HttpPost("login")]
        public IActionResult Login(LoginModel log){

            List<User> users= _repository.getAllUsers().ToList();
            var search= users.FirstOrDefault(s=>s.Email==log.Email);
            
            if(search==null || search.Password!=log.Password){
                return Unauthorized(new {message= "Invalid email or password"});
            }
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, search.Name),
                new Claim(ClaimTypes.Email, search.Email)
            };
 
            var claimsIdentity = new ClaimsIdentity(claims, "CookieAuth");
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddHours(1)
            };
 
            HttpContext.SignInAsync("CookieAuth", new ClaimsPrincipal(claimsIdentity), authProperties);
        
            var userDTO = _mapper.Map<UserDto>(search);
            return Ok( new { message= "Login successfull",userDTO});
        }


        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.SignOutAsync("CookieAuth");
            return Ok(new {message="Logged out successfully"});
        }

    }
}


